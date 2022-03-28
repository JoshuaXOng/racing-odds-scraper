package racing.odds.server.app.database.models;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Event {
  @Id private String id;
  @DBRef private Venue venue;
  private Date scheduledStartTime;
  private Date actualStartTime;
  private Date scheduledEndTime;
  private Date actualEndTime;

  public String getId() {
    return this.id;
  }

  public Venue getVenue() {
    return this.venue;
  }

  public Date getScheduledStartTime() {
    return this.scheduledStartTime;
  }

  public Date getActualStartTime() {
    return this.actualStartTime;
  }

  public Date getScheduledEndTime() {
    return this.scheduledEndTime;
  }

  public Date getActualEndTime() {
    return this.actualEndTime;
  }
}
