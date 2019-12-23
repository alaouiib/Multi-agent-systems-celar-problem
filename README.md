# The CELAR Radio Link Frequency Assignment Problems

### Master in Computer Science (CPS2) — 2019

### Multi-Agent System Coordination Course

## 1 Introduction

The french "Centre d’Électronique de l’Armement" (CELAR) has made available, in the framework of the European
project EUCLID CALMA (Combinatorial Algorithms for Military Applications) s set of Radio Link Frequency
Assignment benchmark problems (RLFAP) build from a real network, with simplified data. These benchmarks had been
previously designed by the CELAR to assess several different Constraint Programming languages. These benchmarks
are extremely valuable as benchmarks for the CSP community and more largely for constraint programming, and are
available athttp://www7.inra.fr/mia/T/schiex/Doc/CELAR.shtml.
The constraints are all binary (involving no more than two variables), non linear and the variables have finite
domains. These are real-world size problems, the larger instances having round one thousand variables and more than
five thousand constraints. All these instances have been built from a unique real instance with 916 links and 5744
constraints in 11 connected components. The aim of this page is to present some essential facts which will be useful
for people trying to tackle these instances. There are also some ideas of the purely practical aspect of these problems
and more specifically of the origine of the criteria optimized.
People interested in Frequency Assignment Problems should have a look to the FAP web site.

## 2 Problem description

The Radio Link frequency Assignment Problem consists in assigning frequencies to a set of radio links defined between
pairs of sites in order to avoid interferences. Each radio link is represented by a variable whose domain is the set of
all frequencies that are available for this link. The essential constraints involve two variablesF 1 etF 2 :

```
|F 1 −F 2 |> k 12
```
The two variables represent two radio links which are "close" one to the other. The constantk 12 depends on
the position of the two links and also on the physical environment. It is obtained using a mathematical model of
electromagnetic waves propagation which is still very "rough". Therefore, the constantsk 12 are not necessarily correct
(it is possible that the minimum difference in frequency between F1 and F2 that does not yield interferences is actually
different fromk 12 ). In practice,k 12 is often overestimated in order to effectively guarantee the absence of interference.
For each pair of sites, two frequencies must be assigned: one for the communications from A to B, the other one for the
communications fromBtoA. In the case of the CELAR instances, a technological constraint appears: the distance in
frequency between theA→Blink and theB→Alink must be exactly equal to 238. In all CELAR instances, these
pairs of links are represented as pairs of variables numbered 2 kand 2 k+ 1. The possibility of expressing constraints
such as|F 1 −F 2 |> k 12 suffices to express the graph coloring problem and it is therefore clear that the RLFAP is
NP-hard.

## 3 The criteria to optimize

In order to facilitate the later addition of new radio links, one tries to build solutions that leave room for these new
links. The pure satisfaction problem is therefore not crucial in itself (even if...). Two essential criteria are usually
considered for feasible instances:
— **Minimization of the maximum frequency used** : the frequencies above the last frequency used can be tried
for new radio links.
— **Minimization of the number of frequencies used** : the different frequencies unused can be tries for new
radio links. Here, it is likely that the various frequencies available will be more distant one from the other and
therefore it is more likely that a new radio link can be inserted without any modification of the previous setup.
In practice, this criteria seems therefore more interesting than the previous one.

#### 1


The first criteria, a Min-Max type criteria, is usually less expensive to optimize from an algorithmic view point.
A third type of criteria is used in practice when the problem is unfeasible (inconsistent): Minimization of a weighted
sum of the violated constraints. As we said before, in constraints such as|F 1 −F 2 |> k 12 , the constantk 12 is usually
overestimated and it is possible that such a constraint be violated without any real interference occurring in practice.
The minimization of a weighted sum of the constraints violated corresponds to a minimization of costs induced to
check the quality of the communication (and possibly a modification of the position of the antennas). The criteria
used on unfeasible instances being different from the criteria used on feasible instances, this gives back some interest
to the pure satisfaction problem which, in practice, will allow to select the optimization criteria to use.
When new links are added to an existing communication network, some variables are already assigned and it is
either impossible to modify the value of these variables (hard constraints) or, again, one must minimize a weighted sum
of the variables being modified. The size of the modification is not important. What is important is that the variable
values has changed which means that somebody must apply this change. One can imagine that the cost associated
with a variable is related to the cost of having the change done.

## 4 Preliminary Exercises

We want to develop a multiagent system to solve frequency assignment problems (FAP) [4]. We propose to map the
FAP as a distributed constraint optimization problem [1]. This DCOP should solve using the DPOP algorithm we have
studied during the class [3].

1. Model FAP as a DCOP
2. Run DPOP on a simple instance (4 antennas, 3 frequencies and 4 inter-site constraints)
3. Analyze and comment your model and solutions

## 5 Pushing the Investigation

Now, you will study other algorithms’ performances on some larger scale CELAR instances of your choice and analyze
their performances. You’ll make use of the a Java library which implements several DCOP solution methods, namely
FRODO [2].

1. Download FRODO athttps://frodo-ai.tech
2. Read carefully the manual (https://manual.frodo-ai.tech/FRODO_User_Manual.html), and run some
    simple experiments using generated instances (https://manual.frodo-ai.tech/FRODO_User_Manual.
    html#x1-65000B)
3. Model a simple FAP problem using the XCSP syntax (https://manual.frodo-ai.tech/FRODO_User_
    Manual.html#x1-110004.2.1)
4. Convert some FAP instances into XCSP instances (by hand or by implementing an _ad hoc_ converter) and
    compare DCOP solution methods with respect to some criteria like (time, number of messages, etc.)
5. Write a 10-page max document reporting your investigation, and send it (with your source code and any other
    files required to run your experiments) topicard@emse.fr

## References

[1] J. Cerquides, A. Farinelli, P. Meseguer, and S. D. Ramchurn. A tutorial on optimization for multi-agent systems. _The
Computer Journal_ , 57(6):799–824, 2014.
[2] Thomas Léauté, Brammert Ottens, and Radoslaw Szymanek. FRODO 2.0: An open-source framework for distributed
constraint optimization. In _Proceedings of the IJCAI’09 Distributed Constraint Reasoning Workshop (DCR’09)_ , pages
160–164, Pasadena, California, USA, July 13 2009.https://frodo-ai.tech.

[3] Adrian Petcu and Boi Faltings. A scalable method for multiagent constraint optimization. _IJCAI International Joint Conference
on Artificial Intelligence_ , pages 266–271, 2005.
[4] T. Schiex. The celar radio link frequency assignment problems. [http://www7.inra.fr/mia/T/schiex/Doc/CELAR.](http://www7.inra.fr/mia/T/schiex/Doc/CELAR.)
shtml, 2015. [Online; accessed 06/11/18].


