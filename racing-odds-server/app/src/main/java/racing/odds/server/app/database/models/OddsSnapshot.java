package racing.odds.server.app.database.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class OddsSnapshot {
  @Id
  private String id;
  @DBRef
  private String oddsRecordId;
  private Date createdAt;
  private List<ContestantOddEntry> contestantsOddEntries;

  public String getId() {
    return this.id;
  }
  public String getOddsRecordId() {
    return this.oddsRecordId;
  }
  public Date getCreatedAt() {
    return createdAt;
  }
  public List<ContestantOddEntry> getContestantsOddEntries() {
    return contestantsOddEntries;
  }
}
