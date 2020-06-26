import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        history: [
            { date: 'case1', customerId: 'ABCBA', amount: 'ABCBA', result:'correct' },
            { date: 'case2', customerId: '10', amount: '12', result:'incorrect' },
            { date: 'case3', customerId: 'string', amount: 'string', result:'correct' },
            { date: 'case4', customerId: 'ABCBA', amount: 'ABCBA', result:'correct' },
            { date: 'case5', customerId: 'ABCBA', amount: 'ABCBA', result:'correct' },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row"> {row.name} </TableCell>
                <TableCell >{row.calories}</TableCell>
                <TableCell >{row.fat}</TableCell>
                <TableCell >{row.carbs}</TableCell>
                <TableCell >{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div"> Details </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Case Number</TableCell>
                                        <TableCell>Output</TableCell>
                                        <TableCell>Expect output</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row"> {historyRow.date} </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell >{historyRow.amount}</TableCell>
                                            <TableCell >{historyRow.result}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Nina Yang', 5, 10, 10, 20),
    createData('Aaron You', 10, 10, 20, 20),
    createData('Ray Lei', 7, 10, 14, 20),
    createData('Edmund Lui', 9, 10, 18, 20),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Student</TableCell>
                        <TableCell>Correct Cases</TableCell>
                        <TableCell>Total Cases</TableCell>
                        <TableCell>Marks</TableCell>
                        <TableCell>Full Marks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}