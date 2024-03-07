import React from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
const TransformedImage = ({image,type,title,transformationConfig,isTransforming,setIsTransforming,hasDownload=false}:TransformedImageProps) => {
  const downloadhandler = () => {

  }
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">
          Transformed
        </h3>
        {hasDownload && (
          <button
            className='download-button'
            onClick={downloadhandler}
          >
            <Image 
            src={'/assets/icons/download.svg'} 
            alt={'Download'}
            width={24}
            height={24}
            className='pb-[6px]'
            />
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig?(
        <div className="relative">
          <CldImage 
              width={getImageSize(type,image,"width")}
              height={getImageSize(type,image,"height")}
              src={image.publicId}
              alt="image"
              sizes={"(max-width: 767px) 100vw, 50vw"}
              placeholder={dataUrl as PlaceholderValue}
              className='transformed-image'
              onLoad={()=>setIsTransforming&&setIsTransforming(false)}
              onError={()=>{debounce(()=>setIsTransforming&&setIsTransforming(false),1000)}}
              {...transformationConfig}
          />
          {isTransforming && (
            <div className="transformed-loader">
              <Image 
              src={'/assets/icons/spinner.svg'} 
              alt={'Transforming...'}
              width={50}
              height={50}
              />
            </div>
          )}
          
        </div>
      ):(
        <div className='transformed-placeholder'>Transformet Image</div>
      )}
    </div>
  )
}

export default TransformedImage