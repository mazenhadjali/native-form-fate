export const loanform = {
    name: 'loanApplication',
    properties: {
        applicantInfo: {
            type: 'block',
            title: 'Applicant Information',
            properties: {
                fullName: {
                    type: 'text',
                    title: 'Full Name',
                    required: true,
                },
                age: {
                    type: 'text',
                    title: 'Age',
                    required: true,
                    validator: (value) =>
                        value >= 18 ? true : 'Must be at least 18 years old',
                },
            },
        },
    },
    buttons: [
        { type: 'submit', label: 'Apply Now' },
        { type: 'reset', label: 'Start Over', variant: 'ghost' },
    ],
};
