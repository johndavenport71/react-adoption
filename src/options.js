import React from 'react'

const Options = ({args}) => {
    return args.map((arg, i) => {
       return <option value={arg} key={i}>{arg}</option>
    })
}

export default Options