'use client';

import { useRef, useState } from 'react';
import { Product } from './Products';

export default function AccountNumberOcr({ cart, setMode }: { cart: Product[], setMode: React.Dispatch<React.SetStateAction<"main" | "purchase">> }) {
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [scanning, setScanning] = useState(false);

    const [receipt, setReceipt] = useState<{
        transactionId: string;
        timestamp: string;
        total: number;
        items: Product[];
    } | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setScanning(true);
        setAccountNumber(null);

        try {
            // aquatrek-pos-ocr.fly.dev/ocr
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch('https://aquatrek-pos-ocr.fly.dev/ocr', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setAccountNumber(data.text || null);
            setScanning(false);
        }
        catch (error) {
            console.error('OCR Error:', error);
            setAccountNumber(null);
            setScanning(false);
        }
    };

    return (
        <div className="checkout-page">
            <img src="/logo.png" alt="AquaTrek Logo" />
            <div style={{ width: '280px', height: '1px', margin: '15px 0', background: '#ffffff20' }}></div>

            {receipt ? (<div className='receipt'>
                <h2>Receipt</h2>
                <p><b>Transaction ID:</b> {receipt.transactionId}</p>
                <p><b>Timestamp:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
                <p><b>Total:</b> ${receipt.total.toFixed(2)}</p>
                <h3>Items Purchased:</h3>
                <div className='rec-products'>
                    {receipt.items.map((item, index) => (
                        <div key={index}>
                            <img src={`/product/${item.imagePath}`} alt={typeof item.name === 'string' ? item.name : (item.name as string[]).join(' / ')} />
                            <span className="right">{typeof item.name === 'string' ? item.name : (item.name as string[]).join(' / ')} - ${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>) : (<>
                <div className="acc-number">
                    <h2>Account Number</h2>
                    <p>{accountNumber || 'Not entered'}</p>
                </div>
                <button onClick={() => {
                    if (!fileInputRef.current) return;
                    fileInputRef.current?.click();
                }} className={`${scanning ? 'disabled' : ''}`}><i className="fas fa-camera"></i> {scanning ? 'Scanning...' : (accountNumber != null ? 'Scan Again' : 'Scan Card')}</button>
                <button onClick={() => {
                    const manual = prompt('Enter Account Number:');
                    if (!manual) return;
                    setAccountNumber(manual);
                }} className={`${scanning ? 'disabled' : ''}`}><i className="fas fa-pencil"></i> Input Manually</button>

                <input style={{ display: 'none' }}
                    onChange={handleFileChange}
                    type="file" accept='image/*' id="fileinp" ref={fileInputRef} capture={"environment"} />

                <div style={{ width: '280px', height: '1px', margin: '15px 0', background: '#ffffff20' }}></div>
                <button onClick={() => {
                    let whatOrdered = ``;
                    const itemCounts: Record<string, number> = {};
                    cart.forEach(item => {
                        const name = typeof item.name === 'string' ? item.name : (item.name as string[]).join(' / ');
                        itemCounts[name] = (itemCounts[name] || 0) + 1;
                    });
                    for (const name in itemCounts) {
                        whatOrdered += `${name} x${itemCounts[name]},\n`;
                    }
                    fetch('https://aquatrek-pos-ocr.fly.dev/checkout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            accountNumber,
                            whatOrdered
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                // alert('Purchase successful!');
                                setReceipt({
                                    transactionId: data.transactionId,
                                    timestamp: data.timestamp,
                                    total: cart.reduce((total, item) => total + item.price, 0),
                                    items: cart
                                });
                            }
                            else {
                                alert('Purchase failed. Please try again.');
                            }
                        })
                        .catch(err => {
                            console.error('Checkout Error:', err);
                            alert('An error occurred during checkout. Please try again.');
                        });
                }} className={((accountNumber == null) || scanning) ? 'disabled' : ''}> <i className="fas fa-shopping-cart"></i> Purchase</button>
            </>)}

            <div className="cart" style={{ textAlign: 'center' }}>
                <h2><i className="fas fa-shopping-cart"></i> Checkout</h2>
                <p><b>Items</b>: {cart.length}</p>
                <p><b>Total</b>: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                
                <div className="buttons">
                    <button onClick={()=>{
                        setMode("main");
                    }}>Back</button>
                </div>
            </div>
        </div>
    );
}