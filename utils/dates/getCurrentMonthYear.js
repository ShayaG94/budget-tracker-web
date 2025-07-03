function getCurrentMonthYear() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const now = new Date();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    return `${monthName} ${year}`;
}

module.exports = { getCurrentMonthYear };
