//import hook useState from react
import React, { useState, useEffect } from 'react';

//import layout
import Layout from '../../Layouts/Default';

// import link
import { Link } from '@inertiajs/inertia-react'

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';
import { set } from 'lodash';

export default function CreatePost({ errors }) {

    //define state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [titleError, setTitleError] = useState('');
    const [titleSuccess, setTitleSuccess] = useState('');

    // useEffect
    useEffect(() => {
        if (title == '') {
            setTitleError("Title harus diisi");
            setTitleSuccess('border-danger');
        } else {
            setTitleError('');
            setTitleSuccess('border-success');
        }
    }, [title]);


    //function "storePost"
    const storePost = async (e) => {
        e.preventDefault();


        //send post request
        Inertia.post('/posts', {
            title: title,
            content: content
        });
    }

    return (
        <Layout>
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header">
                            <span className="font-weight-bold">TAMBAH POST</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={storePost}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Title</label>
                                    <input type="text" className={`form-control ` + titleSuccess} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Judul Post" />
                                </div>
                                {/* {errors.title && (
                                    <div className="alert alert-danger">
                                        {errors.title}
                                    </div>
                                )} */}

                                {titleError && (
                                    <div className="alert alert-danger">
                                            {titleError}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Content</label>
                                    <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Judul Post" rows={4}></textarea>
                                </div>
                                {errors.content && (
                                    <div className="alert alert-danger">
                                        {errors.content}
                                    </div>
                                )}

                                <div>
                                    <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> SAVE</button>
                                    <Link href="/posts" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> CANCEL</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
