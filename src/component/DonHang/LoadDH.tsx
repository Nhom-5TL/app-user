// src/pages/DonHangUse.tsx
import React, { useEffect, useState } from 'react';
import { DonH} from '../api/SanPhams';
import axios from 'axios';
 import './LoadDH.css';
// import { setTimeout } from 'timers/promises';

const DonHangUse: React.FC = () => {
    const [donHangs, setDonHangs] = useState<DonH[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const maKH = localStorage.getItem('maKH');
        const response = await axios.get(`https://localhost:7095/api/DonHang/DonHUSER?maKH=${maKH}`);
        console.log(response.data);
                setDonHangs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const HuyDH = async (idDonHang : number) => {
        try {
           
           if(window.confirm("Bạn có muốn hủy đơn hàng không?")){
             const res = await axios.put(`https://localhost:7095/api/DonHang/HuyDonHang?idDonHang=${idDonHang}`);
            window.location.href = "/loadDH";
            return res.data;
           }
        } catch (error) {
            console.error('Lỗi không xác định:', error);
            alert('Không thể hủy hủy đơn hàng');
        }
    };
    const CTDH = async (maDH : number) => {
        try {
           
             const res = await axios.get(`https://localhost:7095/api/DonHang/DonHUSERCT?maDH=${maDH}`);
            window.location.href = `/loadDH/${maDH}`;
            return res.data;
           
        } catch (error) {
            console.error('Lỗi không xác định:', error);
            alert('Không thể hủy hủy đơn hàng');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="bg0 p-t-104 p-b-116">
        <div className="container">
            <div className="flex-w flex-tr">
                <div className="container bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
        <div>
            <h1>Danh sách Đơn Hàng</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Hình Ảnh</th>
                        <th>Tên Khách Hàng</th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Trạng Thái Thanh Toán</th>
                        <th>Tình Trạng</th>
                        {/* <th>Ngày Nhận</th> */}
                        <th>Ngày Giao</th>
                        <th>Ngày Hủy</th>
                             {/* {setTimeout == 3 ? (
                                <th>Ngày Hủy</th>
                            ): donHangs.tinhTrang == 2 ?(
                                <>
                                <th>Ngày Giao</th>

                                </>
                            ): (
                                <th></th>
                            )} */}
                        
                        <th>Ghi Chú</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {donHangs.map(donHang => (
                        <tr key={donHang.id}>
                            <td >{donHang.id}</td>
                            <td>{donHang.tensp}</td>
                            <td><img src={donHang.hinha} alt={donHang.hinha} className="table-img" /></td>
                            <td>{donHang.tenKh}</td>
                            <td>{donHang.diaChi}</td>
                            <td>{donHang.sdt}</td>
                            <td>{donHang.trangThaiThanhToan}</td>
                            {donHang.tinhTrang == 3 ? (
                                <>
                               <td> Đơn Hàng Đã Hủy</td>
                               <td>{new Date(donHang.ngayGiao).toLocaleDateString('en-GB')}</td>
                               <td>{donHang.ngayHuy ? new Date(donHang.ngayHuy).toLocaleDateString('en-GB') : 'Chưa Hủy'}</td>
                               <td>{donHang.ghiChu}</td>
                               <td><button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 p-b-20 trans-04 js-addcart-detail" 
                                onClick={() => CTDH(donHang.id)}>CT Đơn Hàng</button></td>
                               </>
                            ): donHang.tinhTrang == 2 ?(
                                <>
                                <td>Đơn Hàng Đã Giao</td>
                                <td>{new Date(donHang.ngayGiao).toLocaleDateString('en-GB')}</td>
                                <td>{donHang.ngayNhan ? new Date(donHang.ngayNhan).toLocaleDateString('en-GB')  : 'Chưa nhận'}</td> 
                                <td>{donHang.ghiChu}</td>
<td><button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" 
                                onClick={() => CTDH(donHang.id)}>CT Đơn Hàng</button></td>
                                </>
                            ): (<>
                                <td>Đơn Hàng Đang Giao</td>
                                <td>{new Date(donHang.ngayGiao).toLocaleDateString('en-GB')}</td>
                                <td>{donHang.ngayNhan ? new Date(donHang.ngayNhan).toLocaleDateString('en-GB')  : 'Chưa nhận'}</td> 
                                <td>{donHang.ghiChu}</td>
                                <td ><button className=" stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15  trans-04 js-addcart-detail" 
                                onClick={() => CTDH(donHang.id)}>CT Đơn Hàng</button>
                                     <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" 
                                onClick={() => HuyDH(donHang.id)}>Hủy Đơn Hàng</button></td>
                                </>
                                
                            )}
                            
                            {/* <td>{new Date(donHang.ngayNhan).toLocaleDateString()}</td> */}
                            {/* <td>{new Date(donHang.ngayGiao).toLocaleDateString()}</td> */}
                            {/* <td>{donHang.ngayHuy ? new Date(donHang.ngayHuy).toLocaleDateString() : 'Chưa Hủy'}</td> */}
                            {/* <td>{donHang.ghiChu}</td> */}
                            {/* <td> 
                            {donHang.tinhTrang == 3 || donHang.tinhTrang == 2 ? (
                                ""
                            ): (
                                <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" onClick={() => HuyDH(donHang.id)}>Hủy Đơn Hàng</button>
                            )}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
                    </div>
                </div>
            </section>
    );
};

export default DonHangUse;
