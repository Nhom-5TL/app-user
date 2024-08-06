// src/services/authService.ts
export const getUser = async (): Promise<{ tenKh: string } | null> => {
    // Giả lập: Thay thế bằng yêu cầu thực tế để lấy thông tin người dùng
    return new Promise(resolve => {
        setTimeout(() => {
            const user = localStorage.getItem('myData');
            resolve(user ? JSON.parse(user) : null);
        }, 500);
    });
};

// export const logout = async () => {
    // Giả lập: Thay thế bằng yêu cầu thực tế để xử lý đăng xuất
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         localStorage.removeItem('user');
    //         resolve();
    //     }, 500);
    // });
// };
