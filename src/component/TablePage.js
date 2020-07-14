import React from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';

class TablePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        }
    }

    componentDidMount = async () => {
        const grading = this.props.selectJob.grading;
        let rows = [];
        await grading.map(async (item) => {
            const row = await this.createData(item.DisplayName, item.markingResults);
            rows.push(row);
        });
        this.setState({ rows: rows });
    }

    createData = async (displayName, details) => {
        const List = [];
        let i = 1;
        let correct = 0;
        let marks = 0;
        let fullMarks = 0;
        details.map(detail => {
            detail.testResult.map(item => {
                const thing = {
                    fileName: detail.filename,
                    case: `case${i}`,
                    output: item.output,
                    expectOutput: item.expectOutput,
                    result: item.output === item.expectOutput ? 'correct' : 'incorrect',
                }
                List.push(thing);
                if (thing.result === 'correct') {
                    correct += 1;
                    marks += item.marks;
                }
                i += 1;
                fullMarks += item.marks;
            });
        });
        const re = {
            displayName: displayName,
            correct: correct,
            total: i - 1,
            marks: marks,
            fullMarks: fullMarks,
            details: List,
        };
        return re;
    }

    render() {

        return (
            <>
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
                            {this.state.rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell >{row.displayName}</TableCell>
                <TableCell >{row.correct}</TableCell>
                <TableCell >{row.total}</TableCell>
                <TableCell >{row.marks}</TableCell>
                <TableCell >{row.fullMarks}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div"> Details </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>File Name</TableCell>
                                        <TableCell>Case Number</TableCell>
                                        <TableCell>Output</TableCell>
                                        <TableCell>Expect output</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detail) => (
                                        <TableRow key={detail.case}>
                                            <TableCell >{detail.fileName}</TableCell>
                                            <TableCell >{detail.case}</TableCell>
                                            <TableCell >{detail.output}</TableCell>
                                            <TableCell >{detail.expectOutput}</TableCell>
                                            <TableCell >{detail.result}</TableCell>
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


TablePage.propTypes = {
};

const mapStateToProps = (state) => ({
    selectJob: state.selectJob[0],
});

export default connect(mapStateToProps)(TablePage);