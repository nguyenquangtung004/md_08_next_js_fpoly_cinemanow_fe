const API_BASE_URL = process.env.API_URL;

export const appConfig ={
    apiBaseUrl: API_BASE_URL,

    //Định nghĩa các endpoint của API ở đây
    endPoints:{
        login:(name_cinema: string) =>`${API_BASE_URL}/auth/web/login/${name_cinema}`,
    }
}