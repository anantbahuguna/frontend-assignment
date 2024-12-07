import "./projectsTable.css";

export default function ProjectsTable({ projects }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            return (
              <tr key={`row-${index}`}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
