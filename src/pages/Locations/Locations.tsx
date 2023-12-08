import React from 'react'

// COMPONENTS
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"


// ICONS
import { RiUserSearchFill } from "react-icons/ri";

// PAGE STYLES
import './Locations.css'

export default function Locations() {
    return (
        <>
            <div className='locations-container'>
                <section className='locations-functions'>
                    <div> 
                        <span><RiUserSearchFill className="customers-search-icon"/></span>
                        <span><Input placeholder='Search Customer'  /></span>
                    </div>
                    <div>
                        <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Locations" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </section>
                <section className='locations-body'>
                    <section className='map-container'>

                    </section>
                    <section className='map-board-details'>
                        <Card style={{width: '300px', height: '60vh'}}>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription>Customer Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Name : {'Jonel Teano'}</p>
                            </CardContent>
                            <CardContent>
                                <p>Address : {'General Trias Cavite , Home'}</p>
                            </CardContent>
                            <CardContent>
                                <p>Phone Number : {'09156236917'}</p>
                            </CardContent>
                            <CardContent>
                                <p>Email : {'Jonelteano32@yahoo.com'}</p>
                            </CardContent>
                            <CardContent>
                                <p>Picture : </p>
                                <img src="https://github.com/shadcn.png" ></img>
                            </CardContent>
                        </Card>
                    </section>  
                </section>
            </div>
        </>
    )
}
