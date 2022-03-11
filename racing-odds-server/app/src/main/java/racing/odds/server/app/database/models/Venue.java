package racing.odds.server.app.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Venue {
  @Id
  private String id;
  private String name;

  public String getId() {
    return this.id;
  }
  public String getName() {
    return this.name;
  }
}
