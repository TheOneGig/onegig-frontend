import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Grid, Button } from '@mantine/core';

// third-party
import { useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { getAllSkills } from 'hooks/skills';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => (
                <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const SkillsTable = ({ striped, title }) => {
  const { data: allSkills, isLoading: loadingSkills } = useQuery(['allSkills'], () => getAllSkills());
  const columns = useMemo(
    () => [
      {
        Header: 'Skill',
        accessor: 'skill'
      },
      {
        Header: 'Actions',
        accessor: 'skillId',
        // eslint-disable-next-line
        Cell: ({ value }) => {
          return (
            <Grid>
              <Grid.Col span={4}>
                <Button variant="light" color="blue" mt="md" radius="md" fullWidth onClick={() => handleEdit(gig)}>
                  Edit
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button variant="light" color="red" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
                  Delete
                </Button>
              </Grid.Col>
            </Grid>
          );
        }
      }
    ],
    []
  );
  if (loadingSkills) {
    return <div>Loading skills...</div>;
  }

  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={allSkills} striped={striped} />
      </ScrollX>
    </MainCard>
  );
};

SkillsTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string
};

export default SkillsTable;
