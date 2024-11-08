'use client'

import { MapIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import Image from 'next/image'
import { Locale } from '@/config/i18n-config'

export default async function GetStartedPage({
    params
}: {
    params: Promise<{ lang: Locale }>
}) {
    const lang = (await params).lang;
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Get Started</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Find A Tutor Card */}
                <CardContainer>
                    <CardBody className="bg-gray-50 relative group/card hover:shadow-lg dark:hover:shadow-blue-500/[0.1] w-full h-auto rounded-xl p-6 border-black/[0.1] border-2 transition-all">
                        <div className="flex flex-col items-center text-center">
                            <CardItem translateZ="50">
                                <Image src="/images/3dicons/female-teacher.webp" alt="Find A Tutor" width={256} height={256} />
                            </CardItem>
                            <CardItem translateZ="60" className="text-xl font-semibold mb-3">
                                Find A Tutor
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="80"
                                className="text-gray-600 mb-6"
                            >
                                Connect with experienced tutors who can help you achieve your learning goals.
                            </CardItem>
                            <CardItem
                                translateZ="100"
                                as={Link}
                                href={`/${lang}/request-tutor`}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                            >
                                Search Tutors
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>

                {/* Guide Me Card */}
                <CardContainer>
                    <CardBody className="bg-white relative group/card hover:shadow-lg dark:hover:shadow-green-500/[0.1] w-full h-auto rounded-xl p-6 transition-all">
                        <div className="flex flex-col items-center text-center">
                            <CardItem translateZ="50">
                                <Image src="/images/3dicons/guide.webp" alt="Guide Me" width={256} height={256} />
                            </CardItem>
                            <CardItem translateZ="60" className="text-xl font-semibold mb-3">
                                Guide Me
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="80"
                                className="text-gray-600 mb-6"
                            >
                                Let us help you find the perfect learning path based on your needs and goals.
                            </CardItem>
                            <CardItem
                                translateZ="100"
                                as={Link}
                                href={`/${lang}/guided-path`}
                                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                            >
                                Start Guide
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
        </div>
    )
}
