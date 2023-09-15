import { FC } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  isModalOpen?: boolean; // Agrega una prop para controlar si el modal está abierto
}

const Card: FC<CardProps> = ({ title, description, imageUrl, isModalOpen }) => {
  return (
    <div className={`w-${isModalOpen ? '1/3' : '64'} p-4 bg-green-600 rounded-lg`}>
      <h2 className='text-center text-white text-lg font-bold mb-4'>{title}</h2>
      <div className={`relative w-full ${isModalOpen ? 'h-32' : 'h-44'}`}>
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="contain" // Cambia a 'contain' para ajustar proporcionalmente la imagen
          className="rounded-lg"
        />
      </div>
      <div className={`mt-3 ${isModalOpen ? 'h-20' : 'h-20'} overflow-y-auto`}>
        <p className='text-center text-white text-sm'>{description}</p>
      </div>
    </div>
  );
};

export default Card;