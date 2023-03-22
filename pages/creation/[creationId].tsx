import useSWR from 'swr';
import { ReactElement, useState, FC } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import CreationType from '../../interfaces/Creation';

import shaURL from '../../util/shaURL';
import abbreviateAddress from '../../util/abbreviateAddress';
import timeAgo from '../../util/timeAgo';

import useGetCreation from '../../hooks/useGetCreation';

import Blockies from 'react-blockies';
import Header from '../../app/components/Header';

import { FiMoreHorizontal } from 'react-icons/fi';
import { FaStar, FaRetweet, FaRegStar } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { AiFillEye, AiFillFire } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { HiOutlineArrowNarrowUp, HiOutlineFingerPrint } from 'react-icons/hi'; // HiCommandLine
import { MdOutlineDateRange } from 'react-icons/md';
import { BsFillBookmarkFill, BsAspectRatio } from 'react-icons/bs';
import { SlSizeFullscreen } from 'react-icons/sl';

interface CreationPageProps {
  params: { id: string };
  creation: CreationType;
  size?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Creation: FC<CreationPageProps> = ({
  params,
  creation,
  size = 'regular',
}) => {
  const router = useRouter();
  const creationId = router.query.creationId;

  const {
    uri = '',
    createdAt = '',
    generatorName = '',
    height = 0,
    status = 0,
    text_input = '',
    thumbnail = '',
    user = '',
    width = 0,
    _id = '',
  } = router.query;

  const url = `/api/creation?${creationId}`;
  // const { uri, createdAt, task, user, thumbnail, _id } = creation;
  // const { config, status, generator } = task;
  // const { generatorName } = generator;
  // const { width, height, text_input } = config;

  const { creationData } = useGetCreation(creationId);
  console.log(creationData);

  const isParent = true;

  console.log(router.query.creationId);

  return (
    <>
      <Header />
      <section id='creation-wrapper'>
        <article className='creation'>
          <div className='cr-post'>
            <div className={`cr-card ${size}`}>
              <div className='cr-img-wrapper background'>
                <Image
                  width={width}
                  height={height}
                  style={{ width: '100%' }}
                  className='cr-img'
                  alt={text_input}
                  src={thumbnail}
                />
              </div>
            </div>

            <h1>{creationId}</h1>

            <div className='cr-socials'>
              {/* <span className='cr-social praise'>
              <button className='btn'>
              <FaStar className='icon' />
              <span className='text'>{praiseCount}</span>
              </button>
            </span> */}
              <span className='cr-social remix'>
                <button className='btn'>
                  <FaRetweet className='icon' />
                  <span className='text'>310</span>
                </button>
              </span>
              <span className='cr-social bookmark'>
                <button className='btn'>
                  <BsFillBookmarkFill className='icon' />
                  <span className='text'>Save</span>
                </button>
              </span>
              <span className='cr-social share'>
                <button className='btn'>
                  <IoIosShareAlt className='icon' />
                  <span className='text'>Share</span>
                </button>
              </span>
              <span className='cr-social share'>
                <button className='btn'>
                  <FiMoreHorizontal className='icon' />
                </button>
              </span>
            </div>

            <section className='cr-main'>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'purple', fontWeight: 600 }}>
                  {'/dream'}
                </span>
                <h2>{text_input}</h2>
              </div>

              <article className='cr-main-header'>
                <div className='cr-creator'>
                  <div>
                    <Blockies seed={user} scale={6} />
                  </div>

                  <div className='cr-creator-name-wrapper'>
                    <h3 className='cr-creator-name'>
                      {abbreviateAddress(user)}
                    </h3>
                    <div>
                      <span>{abbreviateAddress(user)}</span>
                      <span>{timeAgo(createdAt)}</span>
                    </div>
                  </div>
                </div>

                <ul className='cr-properties-wrapper'>
                  <li className='cr-property'>
                    <span className='cr-property-type'>
                      <MdOutlineDateRange className='icon' />
                      <span>Date</span>
                    </span>
                    <span>{timeAgo(createdAt)}</span>
                  </li>
                  <li className='cr-property'>
                    <span className='cr-property-type'>
                      <SlSizeFullscreen className='icon' />
                      <span>Size</span>
                    </span>
                    <span>{'512 x 512'}</span>
                  </li>
                  <li className='cr-property'>
                    <span className='cr-property-type'>
                      <BsAspectRatio className='icon' />
                      <span>Command</span>
                    </span>
                    <span>/dream</span>
                  </li>
                  <li className='cr-property'>
                    <span className='cr-property-type'>
                      <BsAspectRatio className='icon' />
                      <span>Shape</span>
                    </span>
                    <span>square</span>
                  </li>
                </ul>
              </article>

              {/* {isParent ? (
              <button className='cr-parent'>
              <span style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineFingerPrint className='icon' />
              <span className='text'>Parent</span>
              </span>
              <Image src={thumbnail} alt={text_input} />
              </button>
            ) : null} */}
            </section>
          </div>
        </article>
      </section>
    </>
  );
};

export default Creation;
