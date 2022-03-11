package racing.odds.server.app.database.models;

public class ContestantOddEntry {
  private String ContestantId;
  private float Odd; 

  public String getContestantId() {
    return this.ContestantId;
  }
  public float getOdd() {
    return this.Odd;
  }

  public void setContestantId(String contestantId) {
    this.ContestantId = contestantId;
  }
  public void setOdd(float odd) {
    this.Odd = odd;
  }
}
