const ContractModel = require('../models/contract');
const EmployeeModel = require('../models/employee');
const crypto = require('crypto');
const generateContractPDF = require('../utils/pdfGenerator');
const path = require('path');
const { format } = require('date-fns');
const { id } = require('date-fns/locale');

const getAllContracts = async (req, res) => {
    try {
        const [data] = await ContractModel.getAllContracts();
        res.json({
            message: 'Get all contracts succeed',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        });
    }
};

const getAllContractsByNik = async (req, res) => {
    const { nik } = req.params;

    try {
        const [data] = await ContractModel.getAllContractsByNik(nik);
        res.json({
            message: 'Get all contract by nik',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        });
    }
};

const getAllContractByDept = async (req, res) => {
    const { dept } = req.params;

    try {
        const [data] = await ContractModel.getAllContractByDept(dept);
        res.json({
            message: 'Get all contract by dept',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message
        });
    }
};

const createNewContract = async (req, res) => {
    const { nik } = req.params;

    try {
        // Fetch employee from the database
        const [employeeDataResult] = await EmployeeModel.getEmployeeByNik(nik);
        if (employeeDataResult.length === 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        let { persName, persGender, persBirthPlace, persBirthDate, persAddress, persKelurahan, persKecamatan, persKota, persProv, famMaritalStatus, perNik, locName, pohName, posName, deptName } = employeeDataResult[0];

        // Fetch compId and empId from the database
        const [employeeResult] = await EmployeeModel.getCompIdByNik(nik);
        if (employeeResult.length === 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        const { compId, empId, empJoinDate } = employeeResult[0];

        // Fetch last No Contract from the database
        const [lastContractResult] = await ContractModel.getLastContractNo({ compId, contractType: "PKWT 1", year: new Date().getFullYear() });
        const lastContractNo = lastContractResult.length > 0 ? lastContractResult[0].cgNo : 0;
        const newContractNo = (lastContractNo + 1).toString().padStart(3, '0'); // Format with leading zeros

        // Add 6 months to the original date
        const addMonths = (date, months) => {
            const d = new Date(date);
            d.setMonth(d.getMonth() + months);
            return d;
        };
        const endContractDate = addMonths(empJoinDate, 6);
        endContractDate.setDate(empJoinDate.getDate() - 1);

        // Format dates
        const formattedEmpJoinDate = format(new Date(empJoinDate), 'dd MMMM yyyy', { locale: id });
        const formattedEndContractDate = format(new Date(endContractDate), 'dd MMMM yyyy', { locale: id });
        const formattedBirthDate = format(new Date(persBirthDate), 'dd MMMM yyyy', { locale: id });

        // Calculate one day before contract start
        const oneDayBeforeJoinDate = new Date(empJoinDate);
        oneDayBeforeJoinDate.setDate(oneDayBeforeJoinDate.getDate() - 1);
        const formattedOneDayBeforeJoinDate = format(oneDayBeforeJoinDate, 'dd MMMM yyyy', { locale: id });

        // Get current day in Indonesian
        const currentDay = format(oneDayBeforeJoinDate, 'EEEE', { locale: id });

        let fullAddress;
        if (persAddress.length > 50) {
            fullAddress = persAddress;
        } else {
            fullAddress = `${persAddress}, Kel. ${persKelurahan}, Kec. ${persKecamatan}, ${persKota}, ${persProv}`;
        }

        // Ubah nilai persGender
        if (persGender === 'L') {
            persGender = 'Laki-Laki';
        } else if (persGender === 'P') {
            persGender = 'Perempuan';
        }

        let contract = {
            empId: empId, // Use the correct empId
            contractType: 'PKWT 1', // Example contract type
            compId: compId,
            cgId: null, // This will be set after inserting into 
            contractNo: newContractNo,
            contractStart: empJoinDate,
            contractEnd: endContractDate,
            name: persName,
            gender: persGender,
            birthPlace: persBirthPlace,
            birthDate: persBirthDate,
            address: fullAddress,
            marriageStatus: famMaritalStatus,
            ktpNo: perNik,
            site: locName,
            poh: pohName,
            position: posName,
            department: deptName,
            contractToken: crypto.randomBytes(16).toString('hex'),
            contractStatus: 'draft'
        };

        const data = await ContractModel.createNewContract(contract);

        let fullContractNo;
        const [contractData] = await ContractModel.getContractByCgId(data.cgId);
        if(contractData.length === 0){
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        fullContractNo = contractData[0].contractNo;

        let hrName;
        let hrPosition;
        const [hrData] = await EmployeeModel.getEmployeeByRole("master");
        if(hrData.length === 0){
            return res.status(404).json({
                message: 'HR not found'
            });
        }
        hrName = hrData[0].persName;
        hrPosition = hrData[0].posName;

        // Reassign contract with formatted dates
        contract = {
            contractNo: newContractNo,
            fullContractNo: fullContractNo,
            hrName: hrName,
            hrPosition: hrPosition,
            currentDay: currentDay,
            currentDate: formattedOneDayBeforeJoinDate,
            contractStart: formattedEmpJoinDate,
            contractEnd: formattedEndContractDate,
            name: persName,
            gender: persGender,
            birthPlace: persBirthPlace,
            birthDate: formattedBirthDate,
            address: fullAddress,
            marriageStatus: famMaritalStatus,
            ktpNo: perNik,
            site: locName,
            poh: pohName,
            position: posName,
            department: deptName
        };

        // Generate PDF draft of the contract
        const pdfFilePath = path.join(__dirname, `../../pdfs/contract_${contract.contractNo}.pdf`);
        await generateContractPDF(contract, pdfFilePath);

        res.json({
            message: 'Create new contract succeed',
            data: data,
            pdfPath: pdfFilePath
        });
    } catch (error) {
        console.error('Error creating new contract:', error);
        res.status(500).json({
            message: "Server error",
            errMessage: error.message
        });
    }
};

const editContract = () => {

};

const deleteContract = () => {

};

module.exports = {
    getAllContracts,
    getAllContractsByNik,
    getAllContractByDept,
    createNewContract,
    editContract,
    deleteContract
};