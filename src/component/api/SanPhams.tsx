import axiosClient from './axiosClient';

// Định nghĩa các endpoint
const END_POINTS = {
    SanPham: 'SanPhams',
    DonHang: 'DonHang/DonHUSER'
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
export interface DonH{
    id: number,
    hinha: string,
    tensp: string,
    tenKt: string,
    soluong: number,
    giaB: number,
    thanhTien: number,
    tinhTrang: number,
    giamgia: number,
    idkh: number,
    trangThaiThanhToan: string,
    ghiChu: string,
    ngayNhan: Date,
    ngayGiao: Date,
    ngayHuy: Date
  }
// export const getDonHangUse = async () => {
//     try {
//         const maKH = localStorage.getItem('maKH');
//         const response = await axiosClient.get(`https://localhost:7095/api/DonHang/DonHUSER?maKH=6`);
//         return response; // Data đã được xử lý bởi interceptor
//     } catch (error) {
//         console.error('Error fetching data', error);
//         throw error; // Đẩy lỗi lên để có thể xử lý trong component
//     }
// };
export interface DonH{
    id: number,
    hinha: string,
    tensp: string,
    tenKt: string,
    soluong: number,
    giaB: number,
    thanhTien: number,
    tinhTrang: number,
    giamgia: number,
    idkh: number,
    trangThaiThanhToan: string,
    ghiChu: string,
    ngayNhan: Date,
    ngayGiao: Date,
    ngayHuy: Date
  }
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
    hinhAnh: string; // Đây sẽ là URL đầy đủ
    maKT: number;
    tenKT: string;
    maMS: number;
    soLuong: number;
    kichThuocs: KichThuocs[];
    mauSacs: MauSacs[];
    hinhAnhURL: string; // Thêm trường này
    hinhAnhs: { tenHinhAnh: string }[];
}

interface KichThuocs {
    maKT: number;
    tenKT: string
}
interface MauSacs {
    maMS: number;
    tenMS: string
}
