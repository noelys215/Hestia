import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';

const photos = [
	{
		src: 'https://hestia-bucket.s3.us-east-1.amazonaws.com/g919Sfyyx5DafBc2id42t.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDOP2ztkm825Ua8IVIaVqFO9HhcLDy0mJbFr%2BKpwD8whQIgGCvpREv4BvikH8RMNW4Eb1xRTnm8tvqEsggND%2FbM70sq7QIImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMjI5NTE2NzMzODciDJs9d9WtTnqGt1OtairBAq7riATzipMhc4bV94ofjhKnlfFxxqqAMM%2B8btPhpxicPTJyov55HqRJ%2FVs3PNsz9zb4690wCMEDViHO7WOTJPnw8CInCDhKtv25UJehEJMdxKR3VG%2BBhiw25SLMMDD1aqUYCajvkWEWgnBVeBUArSVCICT5tB71ANP8%2FGso4%2FUfMJADxtftoWPUPeJBlBRLbmjRiHQ27u%2BTjLGihqXQSUq5YgDAPHIpQKCLl7YNInmsINb%2FjG0wW%2Bcmhg94A%2Bp86nVF%2BDafiYrV6TOz2rQ%2F1NjQRDJXIZtw%2FXGusuY3h2V48qUOYxqPimR08XvLAXInaZQ9vuvjtXVj4FNhFJ09BoQtm0QU%2BRvCYtHsr3kgI8aS0XwOFBzV6RLN%2BzbbTTc40e3DROBjHtps7Md4SWVuH0r7qxAicIl%2FjNJtgRG8huNxizDE%2Fp2hBjqzAnxht54o3Er4Vs%2Box1HXmlRupo1OhpGH%2B9huMUs3DGsy%2F29vHmUj1bRsdS8u4jxY%2FNwjZYy3AyhzLm4ulCczcCQ2GmTCySj70pBDOzpfihif3WpuZHuGKDdNhgNuaL6dncPAHmrBYKP3ZDAYHnu43TJBwJCGdCr2Sutm%2FRDPj7epaUXtVmsjocrpXsaoB1DjvI%2BNWXBYHWBlUsLaUHP2vcSiDtPc5Yircd0J41t8SROTSfeIoaom%2FuFGJEbcqnWmnVhFzg74%2Bdu5UZqrS9Sj2C6WSx2TR4xfyfbf9Cdg9OA72gSYxC%2FMR71MWNmu6zneMD3CRv1M8RaIUvOtmJQdcB1Cshdx1C8Nc7e%2BiVD4W5VOs3lhHe3t2pdwVWukGHKlBpoaO4YpvMO%2FYUCZl8YCisLKkdA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230401T004849Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIATH2HURYV3F5COM7R%2F20230401%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=aaa9f79c3d2dd20cddf36878099587439ab3b9050a8785c1f80caf8ca1c03e9f',
		width: 4,
		height: 3,
	},
	{
		src: 'https://hestia-bucket.s3.us-east-1.amazonaws.com/6Gk-uER7j8OcKt-7G_5Td.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDOP2ztkm825Ua8IVIaVqFO9HhcLDy0mJbFr%2BKpwD8whQIgGCvpREv4BvikH8RMNW4Eb1xRTnm8tvqEsggND%2FbM70sq7QIImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMjI5NTE2NzMzODciDJs9d9WtTnqGt1OtairBAq7riATzipMhc4bV94ofjhKnlfFxxqqAMM%2B8btPhpxicPTJyov55HqRJ%2FVs3PNsz9zb4690wCMEDViHO7WOTJPnw8CInCDhKtv25UJehEJMdxKR3VG%2BBhiw25SLMMDD1aqUYCajvkWEWgnBVeBUArSVCICT5tB71ANP8%2FGso4%2FUfMJADxtftoWPUPeJBlBRLbmjRiHQ27u%2BTjLGihqXQSUq5YgDAPHIpQKCLl7YNInmsINb%2FjG0wW%2Bcmhg94A%2Bp86nVF%2BDafiYrV6TOz2rQ%2F1NjQRDJXIZtw%2FXGusuY3h2V48qUOYxqPimR08XvLAXInaZQ9vuvjtXVj4FNhFJ09BoQtm0QU%2BRvCYtHsr3kgI8aS0XwOFBzV6RLN%2BzbbTTc40e3DROBjHtps7Md4SWVuH0r7qxAicIl%2FjNJtgRG8huNxizDE%2Fp2hBjqzAnxht54o3Er4Vs%2Box1HXmlRupo1OhpGH%2B9huMUs3DGsy%2F29vHmUj1bRsdS8u4jxY%2FNwjZYy3AyhzLm4ulCczcCQ2GmTCySj70pBDOzpfihif3WpuZHuGKDdNhgNuaL6dncPAHmrBYKP3ZDAYHnu43TJBwJCGdCr2Sutm%2FRDPj7epaUXtVmsjocrpXsaoB1DjvI%2BNWXBYHWBlUsLaUHP2vcSiDtPc5Yircd0J41t8SROTSfeIoaom%2FuFGJEbcqnWmnVhFzg74%2Bdu5UZqrS9Sj2C6WSx2TR4xfyfbf9Cdg9OA72gSYxC%2FMR71MWNmu6zneMD3CRv1M8RaIUvOtmJQdcB1Cshdx1C8Nc7e%2BiVD4W5VOs3lhHe3t2pdwVWukGHKlBpoaO4YpvMO%2FYUCZl8YCisLKkdA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230401T004812Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATH2HURYV3F5COM7R%2F20230401%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=caa8216a496a8bda2476c2495b7cbe77dd2fd674991dd51725a12b43cc3833e6',
		width: 1,
		height: 1,
	},
];

export const AdView = () => {
	/* State */
	const [ad, setAd] = useState({});
	const [related, setRelated] = useState([]);
	const [current, setCurrent] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	/* Hooks */
	const params = useParams();

	useEffect(() => {
		if (params?.slug) fetchAd();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.slug]);

	const fetchAd = async () => {
		try {
			const { data } = await axios.get(`/ad/${params.slug}`);
			setAd(data?.ad);
			setRelated(data?.related);
		} catch (error) {
			console.log(error);
		}
	};

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrent(index);
		setIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrent(0);
		setIsOpen(false);
	};

	return (
		<>
			<Gallery photos={photos} onClick={openLightbox} />
			<ModalGateway>
				{isOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							currentIndex={current}
							views={photos.map((x) => ({
								...x,
								srcset: x.srcSet,
								caption: x.title,
							}))}
						/>
					</Modal>
				) : null}
			</ModalGateway>
			<pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
		</>
	);
};
