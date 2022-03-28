package racing.odds.server.app.database.models;

import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document
public class OddsRecord {
  @Id private String id;
  // @DBRef
  @DocumentReference private Event event;

  // @PersistenceConstructor

  public String getId() {
    return this.id;
  }

  public Event getEvent() {
    return this.event;
  }
}
