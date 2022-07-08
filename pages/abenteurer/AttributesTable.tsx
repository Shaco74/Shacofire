import { Grid } from "@mui/material";

export function AttributesTable() {
  return (
    <div className="att-wrapper">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <div className="square-cell">
            <div className="att-circle">MU</div>
            <div className="att-value">14</div>
            <div className="att-definition">Mut</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell">
            <div className="att-circle">KL</div>
            <div className="att-value">11</div>
            <div className="att-definition">Klugheit</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell">
            <div className="att-circle">IN</div>
            <div className="att-value">13</div>
            <div className="att-definition">Intuition</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell">
            <div className="att-circle">CH</div>
            <div className="att-value">11</div>
            <div className="att-definition">Charisma</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell bottom">
            <div className="att-definition">Fingerfertigkeit</div>
            <div className="att-value">10</div>
            <div className="att-circle bottom">FF</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell bottom">
            <div className="att-definition">Gesundheit</div>
            <div className="att-value">13</div>
            <div className="att-circle bottom">GE</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell bottom">
            <div className="att-definition">Konstitution</div>
            <div className="att-value">14</div>
            <div className="att-circle bottom">KO</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="square-cell bottom">
            <div className="att-definition">Körperkraft</div>
            <div className="att-value">14</div>
            <div className="att-circle bottom">KK</div>
          </div>
        </Grid>
      </Grid>

      <style jsx>{`
        .att-wrapper {
          padding: 30px;
        }

        .att-circle {
          background-color: #f5f5f5;
          border: 2px solid rgb(20, 20, 20);
          border-radius: 100%;
          position: relative;
          top: -1.5rem;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.5rem;
        }

        .att-circle.bottom {
          top: initial;
          bottom: -1.7rem;
        }

        .square-cell.bottom {
          justify-content: space-between;
        }

        .square-cell.bottom .att-value {
          top: 13px;
        }

        .att-definition {
          font-weight: normal;
          font-size: 1rem;
        }
        .att-value {
          font-weight: bold;
          font-size: 1.5rem;
          position: relative;
          top: -15px;
          font-size: 2rem;
        }
        .square-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border: 2px solid black;
          height: 7rem;
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
