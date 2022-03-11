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

import racing.odds.server.app.database.models.Venue;
import racing.odds.server.app.database.repositories.VenueRepository;
import racing.odds.server.utilities.MapUtils;

@RestController
@RequestMapping(value="/api/v0/venues")
public class VenueController {
    private MongoOperations mongoOps;
    private VenueRepository repository;
    
    public VenueController(MongoOperations mongoOps, VenueRepository repository) {
      this.mongoOps = mongoOps;
      this.repository = repository;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public Venue getVenue(@PathVariable String id) {
      return this.repository.findOneById(id);
    }
    
    @RequestMapping(method=RequestMethod.GET)
    public List<Venue> getVenues() {
      return this.repository.findAll();
    }
    
    @RequestMapping(method=RequestMethod.POST)
    public Venue createVenue(@RequestBody Venue venue) {
      return mongoOps.insert(venue);   
    }

    @RequestMapping(method=RequestMethod.PUT, value="/{id}")
    public Venue updateVenue(@PathVariable String id, @RequestBody Venue venue) {
      Map<String, Object> processesedVenue = MapUtils.fromObjectWoNulls(venue);
      
      Query predicate = Query.query(Criteria.where("_id").is(id));
      Update updateCommands = new Update();
      processesedVenue.forEach(updateCommands::set);
      FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

      return mongoOps.findAndModify(predicate, updateCommands, options, Venue.class);
    }
  
    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public List<Venue> deleteVenue(@PathVariable String id) {
      return mongoOps.findAllAndRemove(Query.query(Criteria.where("id").is(id)), Venue.class);
    }
}