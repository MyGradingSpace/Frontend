import axios from 'axios';

class Service {

    getCompilingLanguage = async () => {
        // const headers = {
        //     'content-Type': 'application/json',
        //     'Accept': '*/*',
        //     'Cache-Control': 'no-cache',
        //     'Access-Control-Allow-Headers': "*",
        // }
        // axios.get('https://mylearningspace.wlu.ca/d2l/api/lp/1.10/enrollments/myenrollments/', { headers })
        //     .then(function (response) {
        //         console.log(response);
        //         return response;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         return error;
        //     });
        const response = ['C/C++, Java, Python'];
        return response;
    }

    getJobs = async () => {
        const response = [
            {   
                _id:'1',
                course: 'CP-494-A-Directed Research Project II',
                dropbox: 'Assignment 1',
                submissionCounts: '121',
                gradingCounts: '121',
            },
            { 
                _id:'2',
                course: 'CP-493-A-Directed Research Project I',
                dropbox: 'Assignment 1',
                submissionCounts: '5',
                gradingCounts: '5',
            },
            { 
                _id:'3',
                course: 'CP-494-A-Directed Research Project II',
                dropbox: 'Assignment 2',
                submissionCounts: '119',
                gradingCounts: '10',
            },
            { 
                _id:'4',
                course: 'CP-493-A-Directed Research Project I1',
                dropbox: 'Assignment 2',
                submissionCounts: '4',
                gradingCounts: '4',
            },
            { 
                _id:'5',
                course: 'CP-493-A-Directed Research Project I',
                dropbox: 'Assignment 3',
                submissionCounts: '20',
                gradingCounts: '2',
            },
            { 
                _id:'6',
                course: 'CP-494-A-Directed Research Project II',
                dropbox: 'Assignment 3',
                submissionCounts: '30',
                gradingCounts: '0',
            },
        ];

        return response;
    }


}


export default Service;