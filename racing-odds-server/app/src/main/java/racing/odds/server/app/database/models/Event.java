package racing.odds.server.app.database.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Event {
  @Id
  private String id;
  @DBRef
  private String venueId;
  private Date scheduledStartTime;
  private Date actualStartTime;
  private Date scheduledEndTime;
  private Date actualEndTime;

  public String getId() {
    return this.id;
  }
  public String getVenueId() {
    return venueId;
  }
  public Date getScheduledStartTime() {
    return scheduledStartTime;
  }
  public Date getActualStartTime() {
    return actualStartTime;
  }
  public Date getScheduledEndTime() {
    return scheduledEndTime;
  }
  public Date getActualEndTime() {
    return actualEndTime;
  }
}
