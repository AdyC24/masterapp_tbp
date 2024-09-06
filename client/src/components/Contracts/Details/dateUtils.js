export const formatDate = (isDate) => {
    const date = new Date(isDate);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}