import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';

const ToolbarContainer = styled.div`
`;

const EditorContainer = styled.div`
    height: 350px;
`;

const TextEditor = () => {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');
    const [docName, setDocName] = useState('');
    const [availableDocs, setAvailableDocs] = useState([]);
    const [selectedDocId, setSelectedDocId] = useState('');
    const [isQuillInitialized, setIsQuillInitialized] = useState(false);

    useEffect(() => {
        if (isQuillInitialized || !editorRef.current) return;
    
        const timer = setTimeout(() => {
            const editor = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: '#toolbar',
                },
            });
    
            setIsQuillInitialized(true);
    
            editor.on('text-change', () => {
                setContent(editor.root.innerHTML);
            });
        }, 100);
    
        return () => clearTimeout(timer);
    }, [isQuillInitialized]);
    
    useEffect(() => {
        fetchAvailableDocuments();
    }, []);

    const fetchAvailableDocuments = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                'http://localhost:5000/api/documents',
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                setAvailableDocs(response.data);
            } else {
                console.log('Error fetching documents:', response.data.message);
            }
        } catch (error) {
            console.log('Error in fetching documents:', error.response?.data?.message || 'Error fetching documents');
        }
    };

    const saveDocument = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/documents/save',
                { name: docName, content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                console.log('Document saved successfully');
                fetchAvailableDocuments();
            } else {
                console.log('Error saving document:', response.data.message);
            }
        } catch (error) {
            console.log('Error in saving document:', error.response?.data?.message || 'Error saving document');
        }
    };

    const loadDocument = async () => {
        if (!selectedDocId) return;

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `http://localhost:5000/api/documents/load/${selectedDocId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                const data = response.data;
                if (editorRef.current) {
                    editorRef.current.firstChild.innerHTML = data.content;
                }
                setDocName(data.name); 
            } else {
                console.log('Error loading document:', response.data.message);
            }
        } catch (error) {
            console.log('Error in loading document:', error.response?.data?.message || 'Error loading document');
        }
    };

    return (
        <div>
            <ToolbarContainer id="toolbar">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
            </ToolbarContainer>
            <input 
                type="text" 
                value={docName} 
                onChange={e => setDocName(e.target.value)} 
                placeholder="Document Name" 
            />
            <EditorContainer ref={editorRef} />
            <button onClick={saveDocument}>Save</button>
            <select 
                value={selectedDocId} 
                onChange={e => setSelectedDocId(e.target.value)}
            >
                <option value="">Select a document</option>
                {availableDocs.map(doc => (
                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                ))}
            </select>
            <button onClick={loadDocument}>Load</button>
        </div>
    );
};

export default TextEditor;
