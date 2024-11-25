export const formatDate = (isDate) => {
    const date = new Date(isDate);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

export const genderReveal = (gender) => {
    if (gender === "L") {
        return "Laki-Laki";
    } else {
        return "Perempuan";
    }
}


