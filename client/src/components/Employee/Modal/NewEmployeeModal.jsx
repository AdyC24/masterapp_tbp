import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const NewEmployeeModal = ({ isModalOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [companies, setCompanies] = useState([])
    const [divisions, setDivisions] = useState([])
    const [departments, setDepartments] = useState([])
    const [sections, setSections] = useState([])
    const [levels, setLevels] = useState([])
    const [positions, setPositions] = useState([])
    const [pohs, setPohs] = useState([])
    const [formData, setFormData] = useState({
        ktpNo: '',
        name: '',
        gender: '',
        birthPlace: '',
        birthDate: '',
        address: '',
        village: '',
        district: '',
        city: '',
        poh: '',
        mariageStatus: '',
        phoneNumber: '',
        email: '',
        nik: '',
        company: '',
        department: '',
        subDepartment: '',
        unit: '',
        level: '',
        position: '',
        doh: ''
    })

    const modalRef = useRef(null);

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/company`);
            setCompanies(response.data.data)
        } catch (error) {
            console.error("Error fetching company data:", error)
        }
    }

    const fetchDepartments = async (compId) => {
        try {
            const response = await axios.get(`http://localhost:4000/division/${compId}`);
            setDivisions(response.data.data)
        } catch (error) {
            console.error("Error fetching department data:", error)
        }
    }

    const fetchSubDepartments = async (divId) => {
        try {
            const response = await axios.get(`http://localhost:4000/department/${divId}`);
            setDepartments(response.data.data)
        } catch (error) {
            console.error("Error fetching sub-department data:", error);
        }
    }

    const fetchUnits = async (deptId) => {
        try {
            const response = await axios.get(`http://localhost:4000/section/${deptId}`)
            setSections(response.data.data);
        } catch (error) {
            console.error("Error fetching units data:", error)            
        }
    }

    const fetchLevels = async (compId) => {
        try {
            const response = await axios.get(`http://localhost:4000/level/${compId}`);
            setLevels(response.data.data)
        } catch (error) {
            console.error("Error fetching level data:", error)
        }
    }

    const fetchPositions = async (secId, levelId) => {
        try {
            const url = "http://localhost:4000/position?secId=" + secId + "&levelId=" + levelId;
            const response = await axios.get(url);
            setPositions(response.data.data)
        } catch (error) {
            console.error("Error fetching position:", error)
        }
    }

    const fetchPoh = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/poh`)
            setPohs(response.data.data)
        } catch (error) {
            console.error("Error fetching poh:", error)
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [id]: value,
                ...(id === "company" && { department: "", subDepartment: "", unit: "", level: "", position: "" }),
                ...(id === "department" && { subDepartment: "", unit: "", level: "", position: ""  }),
                ...(id === "subDepartment" && { unit: "", level: "", position: ""  }),
                ...(id === "unit" && { level: "", position: ""  }),
                ...(id === "level" && { position: ""  }),
            }

            if (id === "company") {
                if(value) {
                    fetchDepartments(value); //fetch division in DB
                } else {
                    setDivisions([])
                }
            }
    
            if (id === "department") {
                if(value) {
                    fetchSubDepartments(value); //fetch department in DB
                } else {
                    setDepartments([])
                }
            }

            if (id === "subDepartment") { 
                if(value) {
                    fetchUnits(value); //fetch section in DB
                } else {
                    setSections([])
                }
            }
    
            if (id === "company"){
                if(value) {
                    fetchLevels(value); //fetch level in DB
                } else {
                    setLevels([])
                }
            }

            if (updatedData.unit && updatedData.level) {
                fetchPositions(updatedData.unit, updatedData.level)
            }

            return updatedData;
        });        
    }

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // Function section modal
    const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 2));
    const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/employee", formData, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert("Employee added successfully");
                setFormData({
                    ktpNo: '',
                    name: '',
                    gender: '',
                    birthPlace: '',
                    birthDate: '',
                    address: '',
                    village: '',
                    district: '',
                    city: '',
                    province: '',
                    mariageStatus: '',
                    phoneNumber: '',
                    email: '',
                    nik: '',
                    company: '',
                    department: '',
                    level: '',
                    position: '',
                    doh: ''
                });
                onClose();
            } else {
                alert("Failed to add employee")
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    }    

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose()
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        }
    })

    useEffect(() => {
        fetchCompany();
        fetchPoh();
    }, [])
    
    if (!isModalOpen) return null

    return(
        <div>
            {isModalOpen && (
                    <><div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                        <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Employee</h2>
                            <form onSubmit={handleSubmit}>
                                {step === 1 && (
                                    <div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ktpNo">
                                                KTP Number
                                            </label>
                                            <input
                                                type="number"
                                                id="ktpNo"
                                                value={formData.ktpNo}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter KTP Number" 
                                                required
                                                />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Name" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
                                                Gender
                                            </label>
                                            <div className="flex justify-around">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="male"
                                                        name="gender"
                                                        value="L"
                                                        checked={formData.gender === 'L'}
                                                        onChange={handleRadioChange}
                                                        className="w-4 h-4 border-gray-500 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 transition duration-300"
                                                    />
                                                    <label htmlFor="male" className="text-gray-700 text-sm p-2">Male</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="female"
                                                        name="gender"
                                                        value="P"
                                                        checked={formData.gender === 'P'}
                                                        onChange={handleRadioChange}
                                                        className="w-4 h-4 border-gray-500 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 transition duration-300"
                                                    />
                                                    <label htmlFor="female" className="text-gray-700 text-sm p-2">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthPlace">
                                                Birth Place
                                            </label>
                                            <input
                                                type="text"
                                                id="birthPlace"
                                                value={formData.birthPlace}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Birth Place" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthDate">
                                                Birth Date
                                            </label>
                                            <input
                                                type="date"
                                                id="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Birth Date" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="province">
                                                Province
                                            </label>
                                            <input
                                                type="text"
                                                id="province"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Province" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter City" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="district">
                                                Region
                                            </label>
                                            <input
                                                type="text"
                                                id="district"
                                                value={formData.district}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Region" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="village">
                                                Village
                                            </label>
                                            <input
                                                type="text"
                                                id="village"
                                                value={formData.village}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Village" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Address" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mariageStatus">
                                                Mariage Status
                                            </label>
                                            <select name="mariageStatus" id="mariageStatus" value={formData.mariageStatus} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Mariage Status</option>
                                                <option value="TK/0">TK/0</option>
                                                <option value="TK/1">TK/1</option>
                                                <option value="TK/2">TK/2</option>
                                                <option value="TK/3">TK/3</option>
                                                <option value="K/0">K/0</option>
                                                <option value="K/1">K/1</option>
                                                <option value="K/2">K/2</option>
                                                <option value="K/3">K/3</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                id="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Phone Number" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Email" />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>                                        
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nik">
                                                NIK
                                            </label>
                                            <input
                                                type="text"
                                                id="nik"
                                                value={formData.nik}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter NIK" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="company">
                                                Company
                                            </label>
                                            <select name="company" id="company" value={formData.company} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Company</option>
                                                {companies.map(company => (
                                                    <option value={company.compId}>{company.compName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="department">
                                                Department
                                            </label>
                                            <select name="department" id="department" value={formData.department} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Department</option>
                                                {divisions.map(division => (
                                                    <option value={division.divId}>{division.divName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="subDepartment">
                                                Sub Department
                                            </label>
                                            <select name="subDepartment" id="subDepartment" value={formData.subDepartment} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Sub Department</option>
                                                {departments.map(department => (
                                                    <option value={department.deptId}>{department.deptName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="unit">
                                                Unit
                                            </label>
                                            <select name="unit" id="unit" value={formData.unit} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Unit</option>
                                                {sections.map(section => (
                                                    <option value={section.secId}>{section.secName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="postion">
                                                Level
                                            </label>
                                            <select name="level" id="level" value={formData.level} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Level</option>
                                                {levels.map(level => (
                                                    <option value={level.levelId}>{level.levelName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="postion">
                                                Position
                                            </label>
                                            <select name="position" id="position" value={formData.position} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Position</option>
                                                {positions.map(position => (
                                                    <option value={position.posId}>{position.posName}</option>
                                                ))}
                                            </select>{}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="poh">
                                                Point of Hire
                                            </label>
                                            <select name="poh" id="poh" value={formData.poh} onChange={handleInputChange} className="w-full px-3 py-2 text-sm rounded-lg border text-gray-700 focus:outline-none">
                                                <option value="">Point of Hire</option>
                                                {pohs.map(poh => (
                                                    <option value={poh.pohId}>{poh.pohName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="doh">
                                                Date of Hire
                                            </label>
                                            <input
                                                type="date"
                                                id="doh"
                                                value={formData.doh}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                                placeholder="Enter Date of Hire" />
                                        </div>
                                    </div>
                                )}
                                {/* Action Buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className={`${step === 1 ? "hidden" : ""} bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className={`${step === 2 ? "hidden" : ""} bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded`}
                                    >
                                        Next
                                    </button>
                                    {step === 2 && (
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div></>
                )}
        </div>
    )
}

export default NewEmployeeModal