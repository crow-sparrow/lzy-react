import React, { Component } from 'react'
import './banner.css'
import { Carousel, WingBlank } from 'antd-mobile';
export default class Parent extends Component {
    render() {
        return (
            <div className='banner'>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.props.banner.map(item => (
                            <img
                                src={item.img}
                                key={item.id}
                                alt=""
                                style={{ width: '100%', height: '3rem', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });

                                }}
                            />

                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        )
    }
}