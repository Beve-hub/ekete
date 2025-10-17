import { detailsLinks, socialLinks } from "../utils/data"
import { ArrowDownToLine } from 'lucide-react';

export const RightIntro = () => {
    return (
        <div className="grid gap-4">
            <div>
                <p>Socials:</p>
                <div className="flex items-center gap-2">
                    {socialLinks.map(({ platform: Icon, href, label }, index) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label ?? `Open social link ${index + 1}`}
                            title={label}
                            style={{
                                display: "inline-flex",
                                padding: 8,
                                alignItems: "center",
                            }}
                        >
                            <Icon aria-hidden />
                        </a>
                    ))}

                    <a href="/cv.pdf" download className=" flex items-center gap-2 cursor-pointer bg-[var(--bg)]  p-2 rounded-3xl  shadow-md ">
                        <ArrowDownToLine className='inline text-[var(--text)] w-6 h-6' />
                    </a>
                </div>

            </div>

            <div>
                <p>NewsLetter:</p>
                <div className="flex border border-[var(--primary)] rounded-sm px-2 w-[18rem]">
                    <input type="email" placeholder="Enter your email" className="flex-1 outline-none" />
                    <button className="bg-[var(--primary)] text-white rounded-sm px-3 py-2 ml-1">Subscribe</button>
                </div>
            </div>
        </div>
    )
}


export const RightDetails = () => {
    return (
        <div className="grid gap-4">
            <div>
                <p className="mb-2">Socials:</p>
                <div className="flex items-center gap-2">
                    {detailsLinks.map(({ platform: Icon, href, label }, index) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label ?? `Open social link ${index + 1}`}
                            title={label}
                            style={{
                                display: "inline-flex",
                                padding: 8,
                                alignItems: "center",
                            }}
                        >
                            <Icon aria-hidden />
                        </a>
                    ))}

                    <a href="/cv.pdf" download className=" flex items-center gap-2 cursor-pointer bg-[var(--bg)]  p-2 rounded-3xl  shadow-md ">
                        <ArrowDownToLine className='inline text-[var(--text)] w-6 h-6' />

                    </a>
                </div>
            </div>
        </div>
    )
};