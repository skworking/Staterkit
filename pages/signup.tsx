import Seo from '@/shared/layout-components/seo/seo'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useEffect as ReactUseEffect } from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};
const Signup = () => {
    const navigate = useRouter();
    const [passwordshow1, setpasswordshow1] = useState(false);

    interface FormData {
        name: string;
        password: string;
        email: string;
        mobile?: string;
        imageUrl?: string;
        code?: string;
        class?: string;
        profile?: string[];
        access?: string[];
    }

    const [data, setData] = useState<FormData>({
        name: '',
        password: '',
        email: '',
        mobile: '',
        imageUrl: '',
        class: '',
        profile: [],
        access: [],
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name);
        
        if (name === 'profile' || name === 'access') {
            setData({
                ...data,
                [name]: value.split(',').map(item => item.trim()), // Convert comma-separated string to array
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };
    const [imageFile, setImageFile] = useState<File | null>(null);
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            const bas64Image = await convertToBase64(e.target.files[0]);
            setData({ ...data, imageUrl: bas64Image })
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(data);

        try {
            const response = await axios.post('/api/signup', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
            },
          });
            // const response = await axios.post('/api/signup', data);
            console.log(response.data);
            navigate.push('/')
        } catch (error) {
            console.error(error);
        }
    };
    ReactUseEffect(() => {
        import("preline");

    }, []);
    console.log(data);

    return (
        <Fragment>
            <Seo title={"Signup-basic"} />
            <div className="container">
                <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
                    <div className="grid grid-cols-12">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                            {/* <div className="my-[2.5rem] flex justify-center">
                        <Link href="/components/dashboards/crm/">
                            <img src="../../../../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo"/>
                            <img src="../../../../assets/images/brand-logos/desktop-dark.png" alt="logo" className="desktop-dark"/>
                        </Link>
                    </div> */}
                            <div className="box">
                                    <div className="box-body !p-[3rem]">
                                        <p className="h5 font-semibold mb-2 text-center">Sign Up</p>
                                        <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome &amp; Join us by
                                            creating a free account !</p>
                                        <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-12 gap-y-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="signup-name" className="form-label text-default">Name</label>
                                                <input type="text" name="name" className="form-control form-control-lg w-full !rounded-md"
                                                    id="signup-firstname" placeholder="name" value={data.name} onChange={handleChange} />
                                            </div>
                                            {/* <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="signup-lastname" className="form-label text-default">Last Name</label>
                                    <input type="text" className="form-control form-control-lg w-full !rounded-md"
                                        id="signup-lastname" placeholder="last name" />
                                </div> */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="signup-password" className="form-label text-default">Password</label>
                                                <div className="input-group">
                                                    <input type={(passwordshow1) ? 'text' : "password"}
                                                        className="form-control form-control-lg !rounded-e-none"
                                                        id="signup-password" placeholder="password"
                                                        name='password'
                                                        value={data.password}
                                                        onChange={handleChange}
                                                    />
                                                    <button onClick={() => setpasswordshow1(!passwordshow1)} aria-label="button" type="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0"

                                                        id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="email" className="form-label text-default">Email</label>
                                                <input type="text" name="email" className="form-control form-control-lg w-full !rounded-md"
                                                    id="email" placeholder="Email" value={data.email} onChange={handleChange} />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="mobile" className="form-label text-default">Mobile</label>
                                                <input type="text" name="mobile" className="form-control form-control-lg w-full !rounded-md"
                                                    id="mobile" placeholder="Mobile" value={data.mobile} onChange={handleChange} />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="imageUrl" className="form-label text-default">Image URL</label>
                                                <input type="file" name="imageUrl" className="form-control form-control-lg w-full !rounded-md"
                                                    id="imageUrl" onChange={handleFileChange} />


                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="class" className="form-label text-default">Class</label>
                                                <input type="text" name="class" className="form-control form-control-lg w-full !rounded-md"
                                                    id="class" placeholder="Class" value={data.class} onChange={handleChange} />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="profile" className="form-label text-default">Profile</label>
                                                <textarea name="profile" className="form-control form-control-lg w-full !rounded-md"
                                                    id="profile" placeholder="Profile (comma-separated)" value={data.profile?.join(',') || ''} onChange={handleChange}></textarea>
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="access" className="form-label text-default">Access</label>
                                                <textarea name="access" className="form-control form-control-lg w-full !rounded-md"
                                                    id="access" placeholder="Access (comma-separated)" value={data.access?.join(',') || ''} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 mb-2">
                                                <div className="mt-4">
                                                    <div className="form-check !flex !ps-0">
                                                        <input className="form-check-input me-1" type="checkbox" value="" id="defaultCheck1" />
                                                        <label className="ps-2 form-check-label text-[#8c9097] dark:text-white/50 font-normal block" htmlFor="defaultCheck1">
                                                            By creating a account you agree to our <Link href="/components/pages/terms&conditions/"
                                                                className="text-success"><u>Terms &amp; Conditions</u></Link> and <Link href="#!"
                                                                    className="text-success"><u>Privacy Policy</u></Link>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 grid mt-2">
                                                <button type="submit" className="ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10">Create
                                                    Account</button>
                                            </div>
                                        </div>
                                        </form>
                                        <div className="text-center">
                                            <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Already have an account? <Link
                                                href="/" className="text-primary">Sign In</Link></p>
                                        </div>
                                        {/* <div className="text-center my-4 authentication-barrier">
                                <span>OR</span>
                            </div>
                            <div className="btn-list text-center">
                                <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]">
                                    <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                                </button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]">
                                    <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                                </button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light">
                                    <i className="ri-twitter-line font-bold text-dark opacity-[0.7]"></i>
                                </button>
                            </div> */}
                                    </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default Signup