import { format } from 'date-fns';

interface IAgeDate {
    dateFormatted: string;
    startDateFormatted: string;
}

export default (age: number): IAgeDate => {
    const date = new Date();

    date.setFullYear(date.getFullYear() - age);

    const dateFormatted = format(date, 'yyyy-MM-dd');

    const startDate = new Date(`${date.getFullYear()}-01-01 00:00:00`);

    const startDateFormatted = format(startDate, 'yyyy-MM-dd');

    return {
        dateFormatted,
        startDateFormatted,
    };
};
