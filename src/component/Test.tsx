import { useEffect, useState } from 'react';
import { getSanPhamAPI } from './api/SanPhams'; // Đảm bảo đường dẫn chính xác
import { Sp } from './api/SanPhams'; // Đảm bảo đường dẫn chính xác

const Test = () => {
    const [sanPhams, setSanPhams] = useState<Sp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const data = await getSanPhamAPI(); // getSanPhamAPI đã trả về data
                setSanPhams(data.data); // data đã được xử lý bởi interceptor
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchSanPhams();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ marginTop: '100px' }}>
            {sanPhams.length > 0 ? (
                <ul>
                    {sanPhams.map((sp) => (
                        <li key={sp.maSP}>
                            <img src={sp.hinhAnh} alt={sp.tenSP} style={{ width: '100px', height: '100px' }} />
                            <h2>{sp.tenSP}</h2>
                            <p>{sp.moTa}</p>
                            <p>Price: {sp.gia} VND</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default Test;
