// src/pages/DonHangUse.tsx
import React, { useEffect, useState } from "react";
import { DonH } from "../api/SanPhams";
import axios from "axios";
import "./LoadDH.css";
import { Modal, Button, Table } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { setTimeout } from 'timers/promises';

export const LinkImg = "https://localhost:7095/api/SanPhams/get-pro-img/";
interface ChiTietDonHang {
  maSP: number;
  tensp: string;
  tenKT: string;
  tenMS: string;
  maMS: number;
  maKT: number;
  gia: number;
  soLuong: number;
  tenKh: string;
  diaChi: string;
  sdt: string;
  ghiChu: string;
  trangThaiThanhToan: string;
  ngayGiao: Date;
  hinha: string;
  xaPhuong: string;
  tinhThanh: string;
  quanHuyen: string;
}
const DonHangUse: React.FC = () => {
  const [donHangs, setDonHangs] = useState<DonH[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<ChiTietDonHang[]>([]);
  // const { maDH } = useParams<{ maDH: string }>();
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [matt, setTT] = useState<number>(0);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const maKH = localStorage.getItem("maKH");
        const response = await axios.get(
          `https://localhost:7095/api/DonHang/DonHUSER?matt=${matt}&maKH=${maKH}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        console.log(response.data);
        const data = response.data;
        setDonHangs(data.data);
        setTotalRecords(data.totalRecords);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matt,pageNumber, pageSize]);
  const HuyDH = async (idDonHang: number) => {
    try {
      if (window.confirm("Bạn có muốn hủy đơn hàng không?")) {
        const res = await axios.put(
          `https://localhost:7095/api/DonHang/HuyDonHang?idDonHang=${idDonHang}`
        );
        window.location.href = "/loadDH";
        return res.data;
      }
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      alert("Không thể hủy hủy đơn hàng");
    }
  };
  // const CTDH = async (maDH : number) => {
  //     try {

  //          const res = await axios.get(`https://localhost:7095/api/DonHang/DonHUSERCT?maDH=${maDH}`);
  //         window.location.href = `/loadDH/${maDH}`;
  //         return res.data;

  //     } catch (error) {
  //         console.error('Lỗi không xác định:', error);
  //         alert('Không thể hủy hủy đơn hàng');
  //     }
  // };
  const CTDH = async (maDH: number) => {
    try {
      const response = await axios.get<ChiTietDonHang[]>(
        `https://localhost:7095/api/DonHang/DonHUSERCT?maDH=${maDH}`
      );
      setSelectedOrder(response.data);
      handleShow(); // Mở modal
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      alert("Không thể lấy chi tiết đơn hàng");
    }
  };
  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };
  const handleMatt = (newMatt: number) => {
    setTT(newMatt);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <>
      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">
            <div className="container bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <div>
                <h1>Danh sách Đơn Hàng</h1>
                <div className="pagination">
                <Button className="btn btn-outline-info" onClick={() => handleMatt(0)}>Đang xử lý</Button>
                <Button className="btn btn-outline-info" onClick={() => handleMatt(1)}>Đang giao</Button>
                <Button
                  className="btn btn-outline-info"
                  onClick={() => handleMatt(2)}
                >
                  Hoàn thành
                </Button>
              </div>
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
                    {donHangs.map((donHang) => (
                      <tr key={donHang.id}>
                        <td>{donHang.id}</td>
                        <td>{donHang.tensp}</td>
                        <td>
                          <img
                            src={LinkImg + donHang.hinha}
                            alt={donHang.hinha}
                            className="table-img"
                          />
                        </td>
                        <td>{donHang.tenKh}</td>
                        <td>
                          {donHang.tinhThanh} - {donHang.xaPhuong} -{" "}
                          {donHang.quanHuyen} - {donHang.diaChi}
                        </td>
                        <td>{donHang.sdt}</td>
                        <td>{donHang.trangThaiThanhToan}</td>
                        {donHang.tinhTrang == 3 ? (
                          <>
                            <td> Đơn Hàng Đã Hủy</td>
                            <td>
                              {new Date(donHang.ngayGiao).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {donHang.ngayHuy
                                ? new Date(donHang.ngayHuy).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Chưa Hủy"}
                            </td>
                            <td>{donHang.ghiChu}</td>
                            <td>
                              <button
                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 p-b-20 trans-04 js-addcart-detail"
                                onClick={() => CTDH(donHang.id)}
                              >
                                CT Đơn Hàng
                              </button>
                            </td>
                          </>
                        ) : donHang.tinhTrang == 2 ? (
                          <>
                            <td>Đơn Hàng Đã Giao</td>
                            <td>
                              {new Date(donHang.ngayGiao).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {donHang.ngayNhan
                                ? new Date(donHang.ngayNhan).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Chưa nhận"}
                            </td>
                            <td>{donHang.ghiChu}</td>
                            <td>
                              <button
                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                onClick={() => CTDH(donHang.id)}
                              >
                                CT Đơn Hàng
                              </button>
                            </td>
                          </>
                        ) : donHang.tinhTrang == 1 ? (
                          <>
                            <td>Đơn Hàng Đang Giao</td>
                            <td>
                              {new Date(donHang.ngayGiao).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {donHang.ngayNhan
                                ? new Date(donHang.ngayNhan).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Chưa nhận"}
                            </td>
                            <td>{donHang.ghiChu}</td>
                            <td>
                              <button
                                className=" stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15  trans-04 js-addcart-detail"
                                onClick={() => CTDH(donHang.id)}
                                style={{ marginBottom: "10px" }}
                              >
                                CT Đơn Hàng
                              </button>
                              <button
                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                onClick={() => HuyDH(donHang.id)}
                              >
                                Hủy Đơn Hàng
                              </button>
                            </td>
                          </>
                        ) 
                        : (
                          <>
                            <td>Đơn Hàng Đang Xử Lý</td>
                            <td>
                              {new Date(donHang.ngayGiao).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {donHang.ngayNhan
                                ? new Date(donHang.ngayNhan).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Chưa nhận"}
                            </td>
                            <td>{donHang.ghiChu}</td>
                            <td>
                              <button
                                className=" stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15  trans-04 js-addcart-detail"
                                onClick={() => CTDH(donHang.id)}
                                style={{ marginBottom: "10px" }}
                              >
                                CT Đơn Hàng
                              </button>
                              <button
                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                onClick={() => HuyDH(donHang.id)}
                              >
                                Hủy Đơn Hàng
                              </button>
                            </td>
                          </>
                        )
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination">
                  <Button
                    disabled={pageNumber <= 1}
                    onClick={() => handlePageChange(pageNumber - 1)}
                  >
                    Trước
                  </Button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index + 1}
                      variant={
                        index + 1 === pageNumber ? "primary" : "secondary"
                      }
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    disabled={pageNumber >= totalPages}
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    Sau
                  </Button>
                </div>

                <div className="bg0 p-t-104 p-b-116">
                  <Modal
                    className=" p-t-104 "
                    show={showModal}
                    onHide={handleClose}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Đơn giá</th>
                            <th>Tổng giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={LinkImg + item.hinha}
                                  alt={item.tensp}
                                  className="table-img"
                                />
                              </td>
                              <td>{item.tensp}</td>
                              <td>{item.soLuong}</td>
                              <td>{item.tenKT}</td>
                              <td>{item.tenMS}</td>
                              <td>{item.gia.toLocaleString()}</td>
                              <td>
                                {(item.soLuong * item.gia).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <h4>Thông tin người đặt</h4>
                          <p>
                            <strong>Địa chỉ:</strong>{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].tinhThanh
                              : ""}{" "}
                            -{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].xaPhuong
                              : ""}{" "}
                            -{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].quanHuyen
                              : ""}{" "}
                            -{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].diaChi
                              : ""}
                          </p>
                          <p>
                            <strong>Số điện thoại:</strong>{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].sdt
                              : ""}
                          </p>
                          <p>
                            <strong>Tên người đặt:</strong>{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].tenKh
                              : ""}
                          </p>
                          <p>
                            <strong>Ngày đặt:</strong>{" "}
                            {selectedOrder.length > 0
                              ? new Date(
                                  selectedOrder[0].ngayGiao
                                ).toLocaleDateString("en-GB")
                              : ""}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <h4>Thông tin đơn hàng</h4>
                          <p>
                            <strong>Trạng thái đơn hàng:</strong>{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].trangThaiThanhToan
                              : ""}
                          </p>
                          <p>
                            <strong>Hình thức thanh toán:</strong>{" "}
                            {selectedOrder.length > 0
                              ? selectedOrder[0].ghiChu
                              : ""}
                          </p>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </section>
            <section className="bg0 p-t-104 p-b-116">
            <div className="container">
                 <div className="flex-w flex-tr">
                     <div className="container bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
        <Modal 
         show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Size</th>
                                    <th>Color</th>
              <th>Đơn giá</th>
              <th>Tổng giá</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={item.tenKT} alt={item.tensp} className="table-img" /></td>
                <td>{item.tensp}</td>
                <td>{item.soLuong}</td>
                <td>{item.tenKT}</td>
                                        <td>{item.tenMS}</td>
                <td>{item.gia.toLocaleString()}</td>
                <td>{(item.soLuong * item.gia).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="row mb-3">
          <div className="col-md-6">
            <h4>Thông tin người đặt</h4>
            <p><strong>Địa chỉ:</strong> {selectedOrder.length > 0 ? selectedOrder[0].diaChi : ''}</p>
            <p><strong>Số điện thoại:</strong> {selectedOrder.length > 0 ? selectedOrder[0].sdt : ''}</p>
            <p><strong>Tên người đặt:</strong> {selectedOrder.length > 0 ? selectedOrder[0].tenKh : ''}</p>
            <p><strong>Ngày đặt:</strong> {selectedOrder.length > 0 ? new Date(selectedOrder[0].ngayGiao).toLocaleDateString('en-GB') : ''}</p>
          </div>
          <div className="col-md-6">
            <h4>Thông tin đơn hàng</h4>
            <p><strong>Trạng thái đơn hàng:</strong> {selectedOrder.length > 0 ? selectedOrder[0].trangThaiThanhToan : ''}</p>
            <p><strong>Hình thức thanh toán:</strong> {selectedOrder.length > 0 ? selectedOrder[0].ghiChu : ''}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
    </div></div></div> */}
      </section>{" "}
    </>
  );
};

export default DonHangUse;
