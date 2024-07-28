import axiosClient from './axiosClient';

// Định nghĩa các endpoint
const END_POINTS = {
    SanPham: 'SanPhams',
};

// Hàm gọi API để lấy danh sách sản phẩm
export const getSanPhamAPI = async () => {
    try {
        const response = await axiosClient.get(`${END_POINTS.SanPham}`);
        return response; // Data đã được xử lý bởi interceptor
    } catch (error) {
        console.error('Error fetching data', error);
        throw error; // Đẩy lỗi lên để có thể xử lý trong component
    }
};

// Định nghĩa kiểu dữ liệu sản phẩm
export interface Sp {
    maSP: number;
    tenSP: string;
    moTa: string;
    gia: number;
    htvc: number;
    trangThai: number;
    maLoai: number;
    maNhanHieu: number;
    hinhAnh: string;
    maKT: number;
    tenKT: string;
    maMS: number;
    soLuong: number;
    kichThuocs : KichThuocs[];
    mauSacs : MauSacs[]
}
interface KichThuocs {
    maKT: number;
    tenKT: string
}
interface MauSacs {
    maMS: number;
    tenMS: string
}
