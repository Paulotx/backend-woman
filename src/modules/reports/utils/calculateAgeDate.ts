import { format } from 'date-fns';

interface IAgeDate {
    dateFormatted: string;
    startDateFormatted: string;
}

export default (age: number): IAgeDate => {
    const date = new Date();

    date.setFullYear(date.getFullYear() - age);

    const dateFormatted = format(date, 'yyyy-MM-dd');

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startDate = new Date(`${year - 1}-${month + 1}-${day} 00:00:00`);

    const startDateFormatted = format(startDate, 'yyyy-MM-dd');

    return {
        dateFormatted,
        startDateFormatted,
    };
};
