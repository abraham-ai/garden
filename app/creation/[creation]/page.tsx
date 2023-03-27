'use client';

import { ReactElement, useState, FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Creation from '../../../interfaces/Creation';

import abbreviateAddress from '../../../util/abbreviateAddress';
import timeAgo from '../../../util/timeAgo';

// import useReactions from '../../hooks/useReactions';

import Blockies from 'react-blockies';

import { FiMoreHorizontal } from 'react-icons/fi';
import { FaStar, FaRetweet, FaRegStar } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { AiFillEye, AiFillFire } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { HiOutlineArrowNarrowUp, HiOutlineFingerPrint } from 'react-icons/hi'; // HiCommandLine
import { MdOutlineDateRange } from 'react-icons/md';
import { BsFillBookmarkFill, BsAspectRatio } from 'react-icons/bs';
import { SlSizeFullscreen } from 'react-icons/sl';

interface pageProps {
  params: { id: string };
  creation: Creation;
  size?: string;
}
const Creation: FC<pageProps> = ({ params, creation, size = 'regular' }) => {
  // const { pathname, query, asPath } = router;

  // const { uri, createdAt, task, user, thumbnail, _id } = creation;
  // const { config, status, generator } = task;
  // const { generatorName } = generator;
  // const { width, height, text_input } = config;

  // const { praises: praiseCount, burns: burnCount } = useReactions(_id);

  // const isParent = true;

  // return <div className='creation'>{params.id}</div>;
  return <section>{'TEST'}</section>;
};

// <section id='creation-wrapper'>
//   <article className='creation'>
//     <div className='cr-post'>
//       <div className={`cr-card ${size}`}>
//         <div className='cr-img-wrapper background'>
//           <Image
//             width={width}
//             height={height}
//             style={{ width: '100%' }}
//             className='cr-img'
//             alt={text_input}
//             src={thumbnail}
//           />
//         </div>
//       </div>

//       <div className='cr-socials'>
//         <span className='cr-social praise'>
//           <button className='btn'>
//             <FaStar className='icon' />
//             <span className='text'>{praiseCount}</span>
//           </button>
//         </span>
//         <span className='cr-social remix'>
//           <button className='btn'>
//             <FaRetweet className='icon' />
//             <span className='text'>310</span>
//           </button>
//         </span>
//         <span className='cr-social bookmark'>
//           <button className='btn'>
//             <BsFillBookmarkFill className='icon' />
//             <span className='text'>Save</span>
//           </button>
//         </span>
//         <span className='cr-social share'>
//           <button className='btn'>
//             <IoIosShareAlt className='icon' />
//             <span className='text'>Share</span>
//           </button>
//         </span>
//         <span className='cr-social share'>
//           <button className='btn'>
//             <FiMoreHorizontal className='icon' />
//           </button>
//         </span>
//       </div>

//       <section className='cr-main'>
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <span style={{ color: 'purple', fontWeight: 600 }}>
//             {'/dream'}
//           </span>
//           <h2>{text_input}</h2>
//         </div>

//         <article className='cr-main-header'>
//           <div className='cr-creator'>
//             <div>
//               <Blockies seed={user} scale={6} />
//             </div>

//             <div className='cr-creator-name-wrapper'>
//               <h3 className='cr-creator-name'>{abbreviateAddress(user)}</h3>
//               <div>
//                 <span>{abbreviateAddress(user)}</span>
//                 <span>{timeAgo(createdAt)}</span>
//               </div>
//             </div>
//           </div>

//           <ul className='cr-properties-wrapper'>
//             <li className='cr-property'>
//               <span className='cr-property-type'>
//                 <MdOutlineDateRange className='icon' />
//                 <span>Date</span>
//               </span>
//               <span>{timeAgo(createdAt)}</span>
//             </li>
//             <li className='cr-property'>
//               <span className='cr-property-type'>
//                 <SlSizeFullscreen className='icon' />
//                 <span>Size</span>
//               </span>
//               <span>{'512 x 512'}</span>
//             </li>
//             <li className='cr-property'>
//               <span className='cr-property-type'>
//                 <BsAspectRatio className='icon' />
//                 <span>Command</span>
//               </span>
//               <span>/dream</span>
//             </li>
//             <li className='cr-property'>
//               <span className='cr-property-type'>
//                 <BsAspectRatio className='icon' />
//                 <span>Shape</span>
//               </span>
//               <span>square</span>
//             </li>
//           </ul>
//         </article>

//         {isParent ? (
//           <button className='cr-parent' type='link'>
//             <span style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineFingerPrint className='icon' />
//               <span className='text'>Parent</span>
//             </span>
//             <Image src={thumbnail} />
//           </button>
//         ) : null}
//       </section>
//     </div>
//   </article>
// </section>

export default Creation;
