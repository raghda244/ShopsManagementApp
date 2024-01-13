import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteShop, getShopById, updateShop } from '../sevices/shops';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, IconButton, ListItemIcon, ListItemText, Modal, Box, Typography, TextField, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import SetShopsList from '../store/actions/shopActions';
import MapGeoCoder from './mapGeocoder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ShopsList = () => {

    const dispatch = useDispatch();
    const shops = useSelector(state => state.shops);

    const [latlng,setLatLng] = useState([]);

    const [selectedShopId, setSelectedShopId] = useState('');
    const [shopToEdit, setShopToEdit] = useState({
        Name: '',
        Code: 0,
        Location: [0, 0],
        PhoneNum: ''
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event, id) => {
        setSelectedShopId(id);
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmation, setConfirmation] = useState(false);

    const formik = useFormik({
        initialValues: shopToEdit,
        enableReinitialize: true,
        onSubmit: (values,{resetForm}) => {
            updateShop(selectedShopId, { ...values,Location:latlng }).then(()=>{
                resetForm({values:{
                    Name: '',
                    Code: '',
                    Location: [0, 0],
                    PhoneNum: ''
                }})
            }).catch((e)=>console.log(e))
            dispatch(SetShopsList());
            setOpenModal(false);
            handleMenuClose();
            
        }
    });

    const handleOpenModal = () => {
        getShopById(selectedShopId).then((shop) => {
            setShopToEdit(shop);
            setLatLng(shop.Location)
            setOpenModal(true);
        })
    };
    const handleCloseModal = () => setOpenModal(false);

    const handleConfirmationOpen = () => {
        setConfirmation(true);
    }
    const handleConfirmationClose = () => {
        setConfirmation(false);
    }

    const handleDeleteShop = () => {
        deleteShop(selectedShopId);
        dispatch(SetShopsList());
        setConfirmation(false);
        handleMenuClose();
    }

    useEffect(() => {
        dispatch(SetShopsList());
    }, []);

    return (
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Shop Name</TableCell>
                        <TableCell>Shop Code</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shops.length &&
                        shops.map((shop, index) => {
                            return <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{shop.Name}</TableCell>
                                <TableCell>{shop.Code}</TableCell>
                                <TableCell>{shop.PhoneNum}</TableCell>
                                <TableCell align='center'>
                                    <IconButton aria-label="delete" onClick={(event) => { handleMenuClick(event, shop.id) }} value={shop.id}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={handleMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleOpenModal}>
                                            <ListItemIcon>
                                                <EditIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Edit</ListItemText>
                                        </MenuItem>
                                        <Modal
                                            open={openModal}
                                            onClose={handleCloseModal}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <MapContainer center={[30.0444, 31.2357]} zoom={12}>
                                                        <TileLayer
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                                        />
                                                        <MapGeoCoder setLatLng={setLatLng} isEdit={true} latlng={shopToEdit.Location}/>
                                                    </MapContainer>
                                                    <form onSubmit={formik.handleSubmit}>
                                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', marginTop: 3 }}>
                                                            <TextField
                                                                id="name"
                                                                name="Name"
                                                                label="Shop Name"
                                                                value={formik.values.Name}
                                                                onChange={formik.handleChange}
                                                            />
                                                            <TextField
                                                                id="code"
                                                                name="Code"
                                                                label="Shop Code"
                                                                value={formik.values.Code}
                                                                onChange={formik.handleChange}
                                                            />
                                                            <TextField
                                                                id="phone"
                                                                name="PhoneNum"
                                                                label="Phone Number"
                                                                value={formik.values.PhoneNum}
                                                                onChange={formik.handleChange}
                                                            />

                                                        </Box>
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2, marginTop: 5 }}>
                                                            <Button variant="outlined" type="reset" onClick={handleCloseModal}>Cancel</Button>
                                                            <Button variant="contained" type="submit" >Update</Button>
                                                        </Box>
                                                    </form>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                        <MenuItem onClick={handleConfirmationOpen}>
                                            <ListItemIcon>
                                                <DeleteIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Delete</ListItemText>
                                        </MenuItem>
                                        <Modal
                                            open={openConfirmation}
                                            onClose={handleConfirmationClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={{ ...style, width: '20%' }}>
                                                <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Are you sure you want to delete?
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2, marginTop: 5 }}>
                                                        <Button variant="outlined" onClick={handleDeleteShop}>Yes</Button>
                                                        <Button variant="contained" onClick={handleConfirmationClose}>No</Button>
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        }
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ShopsList
