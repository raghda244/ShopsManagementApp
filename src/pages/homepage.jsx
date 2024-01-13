import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import Map from "../components/map"
import ShopsList from "../components/shopsTable"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useFormik } from "formik";
import { addShop } from "../sevices/shops";
import { useDispatch } from "react-redux";
import SetShopsList from "../store/actions/shopActions";
import MapGeoCoder from "../components/mapGeocoder";

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

const HomePage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [latlng, setLatLng] = useState([]);
    const formik = useFormik({
        initialValues: {
            Name: '',
            Code: '',
            Location: [0, 0],
            PhoneNum: ''
        },
        onSubmit: (values,{resetForm}) => {
            addShop({ ...values, Location: latlng }).then(() => {
                resetForm({ values: {
                    Name: '',
                    Code: '',
                    Location: [0, 0],
                    PhoneNum: ''
                } })
            })
            setOpen(false);
            dispatch(SetShopsList());
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="custom-container">
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <h2>
                    Shops Management
                </h2>
                <Button sx={{ textTransform: 'none' }} variant="text" onClick={handleOpen}><AddCircleIcon />Add Shop</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                                <MapGeoCoder setLatLng={setLatLng} isEdit={false} latlng={[]} />
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
                                    <Button variant="outlined" type="reset" onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" type="submit">Continue</Button>
                                </Box>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </Box>
            <Map />
            <ShopsList />
        </div>
    )
}

export default HomePage