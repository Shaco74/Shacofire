import { Avatar, Box, Grid } from "@mui/material";
import { AttributesTable } from "./AttributesTable";

export function HeroInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="valueBox category-title">
          Name <span style={{ fontSize: "initial" }}>Leommara Bärenherz</span>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="valueBox category-title">
          Heldentyp <span style={{ fontSize: "initial" }}>Kriegerin</span>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="attributes-wrapper">
          <span className="category-title">Eigenschaften</span>
          <AttributesTable />
        </div>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20rem",
              }}
            >
              <Avatar
                variant="square"
                sx={{
                  width: "15rem",
                  height: "auto",
                  border: "2px solid black",
                }}
                src="/leomara-heropic.png"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span className="category-title" style={{ marginBottom: "10px" }}>
                Abenteuerpunkte (AP)
              </span>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>AP gesammelt</span>
                      <span className="valueField">0</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>AP ausgegeben</span>
                      <span className="valueField">0</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <span
                className="category-title"
                style={{ marginBottom: "10px", marginTop: "20px" }}
              >
                Schicksalspunkte
              </span>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>Wert</span>
                      <span className="valueField">0</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>Aktuell</span>
                      <span className="valueField">0</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <style jsx>{`
        .attributes-wrapper {
          padding: 0px;
        }
        .category-title {
          padding: 0px;
          font-weight: bold;
          font-size: 1.5rem;
        }
        .valueBox {
          font-weight: bold;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        .valueBox span {
          font-weight: normal;
          padding: 0.5rem;
          border: 2px solid rgb(20, 20, 20);
          background-color: #f5f5f5;
          width: 80%;
        }

        .valueField {
          background-color: #f5f5f5;
          border: 2px solid rgb(20, 20, 20);
          padding: 0.5rem;
          text-align: center;
          width: 80%;
        }
      `}</style>
    </Grid>
  );
}
