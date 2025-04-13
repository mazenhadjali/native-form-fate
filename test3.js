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
                gender: {
                    type: 'radio',
                    title: 'Gender',
                    options: [
                        {label:'Male' , value:'male'},
                        { label: 'Female', value: 'female' },
                    ],
                    required: true,
                },
                socialtype: {
                    type: 'select',
                    title: 'Country of Citizenship',
                    options: [
                        { label: 'Canada', value: 'canada' },
                        { label: 'Tunisia', value: 'Tunisia' },
                        { label: 'Germany', value: 'germany' },
                        { label: 'France', value: 'france' },
                    ],
                    required: true,
                },

            },
        },
    },
    buttons: [
        { type: 'submit', label: 'Apply Now' },
        { type: 'reset', label: 'Start Over', variant: 'ghost' },
    ],
};
