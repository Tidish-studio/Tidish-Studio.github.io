import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const MyPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: 300,
    lineHeight: '60px',
    padding: '10px',
    margin: '10px'
}));

const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    a.dispatchEvent(clickEvt);
    a.remove();
};
const exportToJson = (e, fileName) => {
    e.preventDefault();
    downloadFile({
        data: JSON.stringify(require(`./spells/${fileName}`)),
        fileName: fileName,
        fileType: 'text/json'
    });
};

const Item = ({ text, fileName }) => {
    return (
        <MyPaper elevation={2}>
            <Button onClick={(e) => exportToJson(e, fileName)} variant="text">
                {text}
            </Button>
        </MyPaper>
    );
};

export default Item;
