import axios from 'axios';

// Tạo một instance của axios với cấu hình cơ bản
const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL_API, // Đảm bảo biến môi trường có giá trị đúng
    timeout: 30000 // 30 giây
});

// Thêm interceptor để xử lý phản hồi
instance.interceptors.response.use(
    (response) => {
        return response.data; // Trả về response.data
    },
    (error) => {
        console.error('API call error:', error);
        return Promise.reject(error); // Quan trọng để lỗi có thể được xử lý tiếp
    }
);

export default instance;


// Sử dụng instance để thực hiện một yêu cầu GET
// instance.get('/SanPhams')
//     .then(data => { // Lưu ý: response.data đã được trả về từ interceptor
//         console.log(data); // Dữ liệu đã được xử lý bởi interceptor
//     })
//     .catch(error => {
//         console.error("There was an error!", error); // Xử lý lỗi
//     });
