import axios from 'axios';

class Service {
    getCompilingLanguage = async () => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const response = await axios.get(process.env.REACT_APP_API + `/all-languages`, { headers })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        return response.data;
    }

    getJobs = async (professorId) => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const response = await axios.get(process.env.REACT_APP_API + `/all-jobs?professorId=${professorId}`, { headers })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        return response.data;
    }

    getGrading = async (jobId) => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const response = await axios.get(process.env.REACT_APP_API + `/grading?jobId=${jobId}`, { headers })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        return response.data;
    }

    deleteJob = async (jobId) => {
        const headers = {
            'content-Type': 'application/json',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': "*",
        }
        const response = await axios.delete(process.env.REACT_APP_API + `/job?gradingId=${jobId}`, { headers })
            .catch(function (error) {
                console.log(error);
                return error;
            });

        console.log(response);
        return response.data;
    }

}


export default Service;