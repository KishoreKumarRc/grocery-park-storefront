import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import clsx from "clsx"
import { chunk } from "lodash"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Row, Col } from 'reactstrap'
import Image from "next/image"
const DropdownMenu = () => {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections()
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()
  const collect = [{
    id: 1,
    slug: '/6909013b-3e40-420e-a020-d2b67a533dcf',
    image: '/powdered spices.jpg',
    title: 'Powdered Spices',
    description: 'collection-description-one',
  },
  {
    id: 2,
    slug: '/697f9d02-2638-481f-bfd2-b8f14f90287a',
    image: '/pickel.jpg',
    title: 'Pickles',
    description: 'collection-description-two',
  },
  {
    id: 3,
    slug: '/c75f4b99-955f-4ebf-8bb7-cd5d4cd8e9ad',
    image: '/oil.jpg',
    title: 'Oils',
    description: 'collection-description-three',
  },
  {
    id: 4,
    slug: '/57ae1c61-acbe-470b-a9ec-aa13e55e8f93',
    image: '/spic.jpg',
    title: 'Spice Blends',
    description: 'collection-description-four',
  },
  {
    id: 5,
    slug: '/3be3b196-6ed1-4a32-aee3-0545bd114eef',
    image: '/dal.jpg',
    title: 'Dal',
    description: 'collection-description-five',
  },
  {
    id: 6,
    slug: '/77d50409-6fb6-4ab0-9f5b-ce2139d18dcd',
    image: '/meat.jpg',
    title: 'Meat',
    description: 'collection-description-six',
  }]
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          <>
            <Link href="/shop" passHref>
              <a className="relative flex h-full">
                <Popover.Button
                  className={clsx(
                    "relative h-full flex items-center transition-all ease-out duration-200"
                  )}
                  onClick={() => push("/store")}
                >
                  Store
                </Popover.Button>
              </a>
            </Link>

            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute top-full inset-x-0 text-sm text-gray-700 z-30 border-y border-gray-200"
              >
                <div className="relative bg-white py-8">
                  <div className="flex items-start content-container">
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="text-base-semi text-gray-900 mb-4">
                        Categories
                      </h3>
                      {/* <Row>
                        {collect?.map((data) => {
                          return <>
                            <div className="Dropdown_css">
                              <div className="relative w-full aspect-square small:w-[50%] small:aspect-[28/36] Dropdown_css">
                                <Row >
                                  <Image
                                    src={data?.image}
                                    alt=""
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0"
                                  />
                                </Row>
                              </div>
                              <span>
                                {data?.title}
                              </span>
                            </div>
                          </>
                        })};
                      </Row> */}
                      <div className="flex items-start">
                        {collections &&
                          chunk(collections, 6).map((chunk, index) => {
                            return (
                              <ul
                                key={index}
                                className="min-w-[152px] max-w-[200px] pr-4"
                              >
                                {chunk.map((collection) => {
                                  return (
                                    <div key={collection.id} className="pb-3">
                                      <Link
                                        href={`/collections/${collection.id}`}
                                      >
                                        <a onClick={() => setOpen(false)}>
                                          {collection.title}
                                        </a>
                                      </Link>
                                    </div>
                                  )
                                })}
                              </ul>
                            )
                          })}
                        {loadingCollections &&
                          repeat(6).map((index) => (
                            <div
                              key={index}
                              className="w-12 h-4 bg-gray-100 animate-pulse"
                            />
                          ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-3 gap-4">
                        {products?.slice(0, 3).map((product) => (
                          <ProductPreview {...product} key={product.id} />
                        ))}
                        {loadingProducts &&
                          repeat(3).map((index) => (
                            <SkeletonProductPreview key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div >
  )
}

export default DropdownMenu
