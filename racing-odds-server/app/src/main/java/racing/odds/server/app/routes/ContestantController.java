package racing.odds.server.app.routes;

import java.util.List;
import java.util.Map;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import racing.odds.server.app.database.models.Contestant;
import racing.odds.server.app.database.repositories.ContestantRepository;
import racing.odds.server.utilities.MapUtils;

@RestController
@RequestMapping(value = "/api/v0/contestants")
public class ContestantController {
  private MongoOperations mongoOps;
  private ContestantRepository repository;

  public ContestantController(MongoOperations mongoOps, ContestantRepository repository) {
    this.mongoOps = mongoOps;
    this.repository = repository;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/{id}")
  public Contestant getContestant(@PathVariable String id) {
    return this.repository.findOneById(id);
  }

  @RequestMapping(method = RequestMethod.GET)
  public List<Contestant> getContestants() {
    return this.repository.findAll();
  }

  @RequestMapping(method = RequestMethod.POST)
  public Contestant createContestant(@RequestBody Contestant contestant) {
    return mongoOps.insert(contestant);
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
  public Contestant updateVenue(@PathVariable String id, @RequestBody Contestant contestant) {
    Map<String, Object> processesedVenue = MapUtils.fromObjectWoNulls(contestant);

    Query predicate = Query.query(Criteria.where("_id").is(id));
    Update updateCommands = new Update();
    processesedVenue.forEach(updateCommands::set);
    FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

    return mongoOps.findAndModify(predicate, updateCommands, options, Contestant.class);
  }

  @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
  public List<Contestant> deleteVenue(@PathVariable String id) {
    return mongoOps.findAllAndRemove(Query.query(Criteria.where("id").is(id)), Contestant.class);
  }
}
