from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
from .tools.search_tools import SearchTools

@CrewBase
class SocialBloggingApp:
    """SocialBloggingApp crew"""
    agents: List[BaseAgent]
    tasks: List[Task]
    
    def __init__(self, **kwargs):
        # Initialize the tools
        self.tools = SearchTools().get_google_search_tool()
        super().__init__(**kwargs)
        
    @agent
    def trend_hunter(self) -> Agent:
        return Agent(
            config=self.agents_config['trend_hunter'],
            verbose=True,
            tools=[self.tools]
        )
        
    @agent
    def writer_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['writer_agent'],
            verbose=True,
            tools=[]
        )
        
    @agent
    def editor_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['editor_agent'],
            verbose=True,
            tools=[]
        )
        
    @agent
    def summarizing_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['summarizing_agent'],
            verbose=True,
            tools=[]
        )
    
    @task
    def topic_research_task(self) -> Task:
        return Task(
            config=self.tasks_config['topic_research_task'],
        )
        
    @task
    def blog_drafting_task(self) -> Task:
        return Task(
            config=self.tasks_config['blog_drafting_task'],
        )
        
    @task
    def content_editing_task(self) -> Task:
        return Task(
            config=self.tasks_config['content_editing_task'],
        )
        
    @task
    def metadata_generation_task(self) -> Task:
        return Task(
            config=self.tasks_config['metadata_generation_task'],
            output_file='blog_post_metadata.json'
        )
        
    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )