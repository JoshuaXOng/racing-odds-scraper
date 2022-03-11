package racing.odds.server.app.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class OddsRecord {
  @Id
  private String id;
  @DBRef
  private Event event;

  public String getId() {
    return this.id;
  }
  public Event getEventId() {
    return this.event;
  }
}
